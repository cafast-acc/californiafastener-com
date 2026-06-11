#!/usr/bin/env python3
"""Remove the baked studio bed from product renders -> transparent PNGs.

Approach: a pixel is "bed" if it is bright + low-saturation (the studio bed and
its soft drop-shadow both qualify), and it is only removed if it is CONNECTED to
the image border through other bed pixels. The opaque bolt breaks connectivity,
so interior chrome highlights (also bright/low-sat) are preserved. The alpha is
feathered so the cut edge stays anti-aliased.
"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage


def cutout(path, out, warm_thresh=5, lum_frac=0.45, feather=1.2):
    im = Image.open(path).convert("RGB")
    arr = np.asarray(im).astype(np.float32)
    h, w, _ = arr.shape

    border = np.concatenate([arr[0], arr[-1], arr[:, 0], arr[:, -1]])
    bed = np.median(border, axis=0)
    bedlum = bed.mean()

    lum = arr.mean(axis=2)
    warm = arr[:, :, 0] - arr[:, :, 2]  # R-B: the bed/shadow are warm, chrome is not

    # Bed-like: warm-tinted (bed + its darkened shadow) and not pitch-black, OR
    # essentially bed-bright. Chrome is neutral/cool so it fails the warm test.
    bedness = ((warm > warm_thresh) & (lum > bedlum * lum_frac)) | (lum >= bedlum * 0.99)

    # Keep only bed regions connected to the border.
    lbl, _ = ndimage.label(bedness)
    seeds = np.zeros((h, w), bool)
    seeds[0, :] = seeds[-1, :] = seeds[:, 0] = seeds[:, -1] = True
    border_labels = set(np.unique(lbl[seeds & bedness]))
    border_labels.discard(0)
    bg = np.isin(lbl, list(border_labels))

    # Fill any holes in the FOREGROUND mask (so interior bed-ish specks on the
    # bolt don't get punched out), then keep only the main part (drop stray
    # fragments / detached shadow islands).
    fg = ~bg
    fg = ndimage.binary_fill_holes(fg)
    comp, n = ndimage.label(fg)
    if n > 1:
        sizes = ndimage.sum(np.ones_like(comp), comp, range(1, n + 1))
        keep = np.argmax(sizes) + 1
        fg = comp == keep
        fg = ndimage.binary_fill_holes(fg)

    alpha = np.where(fg, 255.0, 0.0)
    alpha = ndimage.gaussian_filter(alpha, feather)
    rgba = np.dstack([arr, alpha]).astype(np.uint8)
    Image.fromarray(rgba, "RGBA").save(out)

    coverage = fg.mean() * 100
    print(f"{out}  bed={tuple(int(x) for x in bed)}  fg_coverage={coverage:.1f}%")


if __name__ == "__main__":
    jobs = [
        ("public/assets/product-hollobolt.png", "public/assets/product-hollobolt-cutout.png"),
        ("public/assets/products/hollo-bolt-hex-head-2.png", "public/assets/products/hollo-bolt-hex-head-2-cutout.png"),
        ("public/assets/products/hollo-bolt-countersunk-2.png", "public/assets/products/hollo-bolt-countersunk-2-cutout.png"),
        ("public/assets/products/hollo-bolt-flush-fit-2.png", "public/assets/products/hollo-bolt-flush-fit-2-cutout.png"),
    ]
    for src, dst in jobs:
        cutout(src, dst)
