"use client";

import { useEffect, useRef, useState } from "react";
import type { SelectionState } from "@/lib/specBuilder/scoring";
import { titleCase } from "@/lib/specBuilder/scoring";

/**
 * Spec Builder quote modal. Posts to Jotform 260995842557069 via a hidden
 * iframe; the iframe's onLoad fires the thank-you screen. Hidden fields
 * carry the user's spec context (q7..q12) so estimators see what was
 * recommended without needing the user to retype it.
 *
 * Field map (mirrors the form Jotform was built with):
 *   input_16 = Full Name (required)
 *   input_3  = Email (required)
 *   input_4  = Company (required)
 *   input_5_full = Phone (required)
 *   input_6  = Message / textarea
 *   input_7..input_12 = hidden spec context (spec, grade, app, env, strength, constraints)
 */
export type QuoteData = {
  spec: string;
  grade: string;
  app: string;
  env: string;
  strength: string;
  constraints: string;
};

export function QuoteModal({
  open,
  data,
  state,
  onClose,
}: {
  open: boolean;
  /** When provided, the modal opens pinned to a specific recommendation (Top pick).
   *  When null, the modal opens for "Talk to an engineer" with broader spec context. */
  data: QuoteData | null;
  state: SelectionState;
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Reset state when reopened
  useEffect(() => {
    if (open) {
      setSent(false);
      setSubmitting(false);
      setErrors({});
      // Focus name field after the open animation
      const t = setTimeout(() => {
        document.getElementById("input_16")?.focus();
      }, 150);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Body scroll lock + ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // Phone mask. Don't append `") "` until there are 4+ digits so the user
  // can backspace through the area code — the previous version locked it in
  // the moment the third digit was entered.
  const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const v = input.value.replace(/\D/g, "").substring(0, 10);
    let out = "";
    if (v.length === 0) out = "";
    else if (v.length <= 3) out = "(" + v;
    else if (v.length <= 6) out = "(" + v.substring(0, 3) + ") " + v.substring(3);
    else
      out =
        "(" +
        v.substring(0, 3) +
        ") " +
        v.substring(3, 6) +
        "-" +
        v.substring(6, 10);
    input.value = out;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const required = ["input_16", "input_3", "input_4", "input_5_full"];
    const newErrors: Record<string, boolean> = {};
    required.forEach((id) => {
      const f = form.querySelector<HTMLInputElement>(`#${id}`);
      if (f && !f.value.trim()) newErrors[id] = true;
    });
    if (Object.keys(newErrors).length > 0) {
      e.preventDefault();
      setErrors(newErrors);
      return;
    }
    // Set submitDate
    const submitDate = form.querySelector<HTMLInputElement>("#submitDate");
    if (submitDate) submitDate.value = new Date().toISOString();
    setSubmitting(true);
    // Iframe target handles the post; we await its onLoad below.
  };

  if (!open) return null;

  const showContext = !!data?.spec;
  const ctxApp = data?.app || state.app;
  const ctxEnv = data?.env || state.env.join(" + ");
  const ctxStrength = data?.strength || state.strength;

  return (
    <div
      className="sb-modal-overlay is-open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sb-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sb-modal" role="document">
        <div className="sb-modal-head">
          <h3 id="sb-modal-title">Request a quote</h3>
          <button type="button" className="sb-modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {showContext && (
          <div className="sb-modal-context">
            <div className="sb-modal-context-label">Based on your selection</div>
            <div className="sb-modal-context-pills">
              <span className="sb-modal-pill">
                <strong>{data.spec}</strong>
                {data.grade}
              </span>
              {ctxApp && <span className="sb-modal-pill">{titleCase(ctxApp)}</span>}
              {ctxEnv && <span className="sb-modal-pill">{titleCase(ctxEnv)}</span>}
              {ctxStrength && (
                <span className="sb-modal-pill">{titleCase(ctxStrength)} strength</span>
              )}
            </div>
          </div>
        )}

        {!sent && (
          <div id="sb-modal-form-wrap">
            <form
              ref={formRef}
              className="jotform-form"
              action="https://submit.jotform.com/submit/260995842557069"
              method="post"
              name="form_260995842557069"
              id="260995842557069"
              acceptCharset="utf-8"
              autoComplete="on"
              target="sb-jf-frame"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="formID" value="260995842557069" />
              <input type="hidden" id="JWTContainer" value="" />
              <input type="hidden" id="cardinalOrderNumber" value="" />
              <input
                type="hidden"
                id="jsExecutionTracker"
                name="jsExecutionTracker"
                value="build-date-1775863460314"
              />
              <input type="hidden" id="submitSource" name="submitSource" value="spec-builder" />
              <input type="hidden" id="submitDate" name="submitDate" defaultValue="" />
              <input type="hidden" id="buildDate" name="buildDate" value="1775863460314" />
              <input
                type="hidden"
                name="uploadServerUrl"
                value="https://upload.jotform.com/upload"
              />
              <input type="hidden" name="eventObserver" value="1" />

              <ul className="form-section page-section">
                <li className="form-line jf-required" data-type="control_textbox" id="id_16">
                  <label
                    className="form-label form-label-top form-label-auto"
                    id="label_16"
                    htmlFor="input_16"
                  >
                    Full Name<span className="form-required">*</span>
                  </label>
                  <div id="cid_16" className="form-input-wide jf-required">
                    <input
                      type="text"
                      id="input_16"
                      name="q16_fullName"
                      data-type="input-textbox"
                      className={`form-textbox validate[required]${errors.input_16 ? " is-error" : ""}`}
                      data-component="textbox"
                      aria-labelledby="label_16"
                      required
                      defaultValue=""
                      onInput={() => setErrors((e) => ({ ...e, input_16: false }))}
                    />
                  </div>
                </li>
                <li className="form-line jf-required" data-type="control_email" id="id_3">
                  <label
                    className="form-label form-label-top form-label-auto"
                    id="label_3"
                    htmlFor="input_3"
                  >
                    Email Address<span className="form-required">*</span>
                  </label>
                  <div id="cid_3" className="form-input-wide jf-required">
                    <input
                      type="email"
                      id="input_3"
                      name="q3_q3_email1"
                      className={`form-textbox validate[required, Email]${errors.input_3 ? " is-error" : ""}`}
                      autoComplete="section-input_3 email"
                      data-component="email"
                      aria-labelledby="label_3"
                      required
                      defaultValue=""
                      onInput={() => setErrors((e) => ({ ...e, input_3: false }))}
                    />
                  </div>
                </li>
                <li className="form-line jf-required" data-type="control_textbox" id="id_4">
                  <label
                    className="form-label form-label-top form-label-auto"
                    id="label_4"
                    htmlFor="input_4"
                  >
                    Company Name<span className="form-required">*</span>
                  </label>
                  <div id="cid_4" className="form-input-wide jf-required">
                    <input
                      type="text"
                      id="input_4"
                      name="q4_q4_textbox2"
                      data-type="input-textbox"
                      className={`form-textbox validate[required]${errors.input_4 ? " is-error" : ""}`}
                      data-component="textbox"
                      aria-labelledby="label_4"
                      required
                      defaultValue=""
                      onInput={() => setErrors((e) => ({ ...e, input_4: false }))}
                    />
                  </div>
                </li>
                <li className="form-line jf-required" data-type="control_phone" id="id_5">
                  <label
                    className="form-label form-label-top form-label-auto"
                    id="label_5"
                    htmlFor="input_5_full"
                  >
                    Phone<span className="form-required">*</span>
                  </label>
                  <div id="cid_5" className="form-input-wide jf-required">
                    <input
                      type="tel"
                      id="input_5_full"
                      name="q5_q5_phone3[full]"
                      data-type="mask-number"
                      className={`mask-phone-number form-textbox validate[required]${errors.input_5_full ? " is-error" : ""}`}
                      autoComplete="section-input_5 tel-national"
                      placeholder="(000) 000-0000"
                      data-component="phone"
                      aria-labelledby="label_5"
                      required
                      defaultValue=""
                      onInput={(e) => {
                        handlePhoneInput(e);
                        setErrors((er) => ({ ...er, input_5_full: false }));
                      }}
                    />
                  </div>
                </li>
                <li className="form-line" data-type="control_textarea" id="id_6">
                  <label
                    className="form-label form-label-top form-label-auto"
                    id="label_6"
                    htmlFor="input_6"
                  >
                    Anything we should know?{" "}
                    <span className="sb-label-hint">
                      (sizing, quantity, lead time, special notes)
                    </span>
                  </label>
                  <div id="cid_6" className="form-input-wide">
                    <textarea
                      id="input_6"
                      className="form-textarea"
                      name="q6_q6_textarea4"
                      data-component="textarea"
                      aria-labelledby="label_6"
                      defaultValue=""
                    />
                  </div>
                </li>

                {/* Hidden fields populated from Spec Builder state */}
                <input type="hidden" id="input_7" name="q7_q7_textbox5" value={data?.spec || ""} />
                <input type="hidden" id="input_8" name="q8_q8_textbox6" value={data?.grade || ""} />
                <input type="hidden" id="input_9" name="q9_q9_textbox7" value={data?.app || state.app || ""} />
                <input type="hidden" id="input_10" name="q10_q10_textbox8" value={data?.env || state.env.join(", ")} />
                <input type="hidden" id="input_11" name="q11_q11_textbox9" value={data?.strength || state.strength} />
                <input type="hidden" id="input_12" name="q12_q12_textbox10" value={data?.constraints || state.constraints.join(", ")} />
                <input type="hidden" id="input_15" name="q15_website" value="" />

                <li className="form-line" data-type="control_button" id="id_14">
                  <div id="cid_14" className="form-input-wide">
                    <div className="form-buttons-wrapper">
                      <button
                        id="input_14"
                        type="submit"
                        className="form-submit-button submit-button"
                        disabled={submitting}
                      >
                        {submitting ? "Sending…" : "Send request"}
                      </button>
                    </div>
                  </div>
                </li>
                <li style={{ display: "none" }}>
                  Should be Empty: <input type="text" name="website" defaultValue="" />
                </li>
              </ul>

              <input
                type="hidden"
                className="simple_spc"
                id="simple_spc"
                name="simple_spc"
                value="260995842557069-260995842557069"
              />
            </form>
          </div>
        )}

        {sent && (
          <div className="sb-thank-you" style={{ display: "block" }}>
            <div className="sb-ty-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12l4 4L19 7" />
              </svg>
            </div>
            <h3>Got it — request sent.</h3>
            <p>
              A team member will reach out within one business day with pricing, lead time, and
              any spec questions.
            </p>
            <button type="button" className="sb-ty-close" onClick={onClose}>
              Back to results
            </button>
          </div>
        )}

        {/* Hidden iframe for Jotform submission target */}
        <iframe
          ref={iframeRef}
          name="sb-jf-frame"
          id="sb-jf-frame"
          title="Spec Builder submission target"
          style={{ display: "none", width: 0, height: 0, border: "none" }}
          onLoad={() => {
            if (submitting) {
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                event: "quote_submit",
                form_id: "spec-builder",
                spec: data?.spec,
                grade: data?.grade,
              });
              setSubmitting(false);
              setSent(true);
            }
          }}
        />
      </div>
    </div>
  );
}
