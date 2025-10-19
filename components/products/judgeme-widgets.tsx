"use client"

import { useEffect, useRef } from "react"
import { Star, MessageSquare, Camera, Award } from "lucide-react"

interface JudgeMeBadgeProps {
  productHandle: string
}

export function JudgeMeBadge({ productHandle }: JudgeMeBadgeProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const script = document.createElement("script")
    script.src = "https://cdn.judge.me/shopify_v2.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [productHandle])

  return (
    <div ref={containerRef} className="jdgm-widget jdgm-preview-badge" data-id={productHandle} data-template="index" />
  )
}

interface JudgeMeReviewWidgetProps {
  productHandle: string
  productId: string
}

export function JudgeMeReviewWidget({ productHandle, productId }: JudgeMeReviewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const script = document.createElement("script")
    script.src = "https://cdn.judge.me/shopify_v2.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [productHandle, productId])

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Judge.me Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-[#C8A55C] fill-[#C8A55C]" />
              <h2 className="text-2xl font-bold text-[#0B1C2C]">Customer Reviews</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Verified by</span>
            <img
              src="https://cdn.judge.me/assets/judgeme_logo.svg"
              alt="Judge.me"
              className="h-5"
              onError={(e) => {
                e.currentTarget.style.display = "none"
                const sibling = e.currentTarget.nextElementSibling as HTMLElement
                if (sibling) sibling.classList.remove("hidden")
              }}
            />
            <span className="hidden font-semibold text-[#C8A55C]">Judge.me</span>
          </div>
        </div>

        {/* Review Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="flex items-center gap-2 text-sm">
            <Award className="w-4 h-4 text-[#C8A55C]" />
            <span className="text-gray-700">Verified Reviews</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Camera className="w-4 h-4 text-[#C8A55C]" />
            <span className="text-gray-700">Photo Reviews</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MessageSquare className="w-4 h-4 text-[#C8A55C]" />
            <span className="text-gray-700">Q&A Available</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Star className="w-4 h-4 text-[#C8A55C] fill-[#C8A55C]" />
            <span className="text-gray-700">Rated by Customers</span>
          </div>
        </div>
      </div>

      {/* Judge.me Widget Container */}
      <div className="p-6 judgeme-custom-styles">
        <div
          ref={containerRef}
          className="jdgm-widget jdgm-review-widget"
          data-id={productHandle}
          data-product-id={productId}
        />
      </div>

      <style jsx global>{`
        /* Scope all styles to the Judge.me widget root container */
        .jdgm-widget,
        .jdgm-widget * {
          box-sizing: border-box;
        }

        :root {
          --afp-primary: #0a4b78;
          --afp-primary-hover: #083c60;
          --afp-accent: #c8a55c;
          --afp-text: #0f172a;
          --afp-muted: #475569;
          --afp-bg: #f7fafc;
          --afp-border: #e2e8f0;
          --afp-radius: 10px;
          --afp-radius-sm: 8px;
          --afp-shadow: 0 6px 18px rgba(16, 24, 40, 0.08);
          --afp-focus: 0 0 0 3px rgba(10, 75, 120, 0.25);
        }

        /* Card layout */
        .jdgm-write-review,
        .jdgm-rev-widg {
          max-width: 720px;
          margin: 24px auto;
          padding: 24px;
          background: #fff;
          border: 1px solid var(--afp-border);
          border-radius: var(--afp-radius);
          box-shadow: var(--afp-shadow);
          color: var(--afp-text);
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans",
            "Apple Color Emoji", "Segoe UI Emoji";
          line-height: 1.45;
        }

        /* Title */
        .jdgm-write-review .jdgm-hr {
          display: none;
        }
        .jdgm-write-review .jdgm-form__title,
        .jdgm-widget .jdgm-rev-widg__title {
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 16px;
          color: var(--afp-primary);
        }

        /* Rating row */
        .jdgm-write-review .jdgm-form__rating-fieldset {
          margin: 12px 0 8px;
        }
        .jdgm-write-review .jdgm-star,
        .jdgm-widget .jdgm-star {
          font-size: 22px;
          margin-right: 4px;
          color: var(--afp-accent) !important;
        }
        .jdgm-write-review .jdgm-star.jdgm--off,
        .jdgm-widget .jdgm-star.jdgm--off {
          color: #cbd5e1 !important;
        }
        .jdgm-write-review .jdgm-star.jdgm--on,
        .jdgm-widget .jdgm-star.jdgm--on {
          color: var(--afp-accent) !important;
        }

        /* Labels */
        .jdgm-widget label,
        .jdgm-write-review .jdgm-form__label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: var(--afp-muted);
          margin: 12px 0 6px;
        }

        /* Inputs & textareas */
        .jdgm-widget input[type="text"],
        .jdgm-widget input[type="email"],
        .jdgm-widget input[type="url"],
        .jdgm-widget input[type="file"],
        .jdgm-widget .jdgm-form__input,
        .jdgm-widget textarea {
          width: 100%;
          padding: 12px 14px;
          font-size: 15px;
          color: var(--afp-text);
          background: var(--afp-bg);
          border: 1px solid var(--afp-border);
          border-radius: var(--afp-radius-sm);
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .jdgm-widget textarea {
          min-height: 140px;
          resize: vertical;
        }

        .jdgm-widget input:focus,
        .jdgm-widget textarea:focus {
          outline: none;
          border-color: var(--afp-primary);
          box-shadow: var(--afp-focus);
          background: #fff;
        }

        /* Inline help/notes */
        .jdgm-widget .jdgm-form__body .jdgm-form__note,
        .jdgm-widget .jdgm-privacy-policy {
          font-size: 12px;
          color: var(--afp-muted);
        }

        /* Upload + URL rows */
        .jdgm-widget .jdgm-form__media,
        .jdgm-widget .jdgm-form__youtube {
          background: #fff;
          border: 1px dashed var(--afp-border);
          padding: 12px;
          border-radius: var(--afp-radius-sm);
        }

        /* Display name + email row: make two columns on desktop */
        .jdgm-widget .jdgm-form__name,
        .jdgm-widget .jdgm-form__email {
          width: 100%;
        }

        /* Buttons */
        .jdgm-widget .jdgm-submit-rev,
        .jdgm-widget button[type="submit"],
        .jdgm-widget .jdgm-write-rev-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 18px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 15px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.02s ease;
          user-select: none;
          background: var(--afp-primary);
          color: #fff;
          box-shadow: 0 2px 0 rgba(0, 0, 0, 0.06);
          text-decoration: none;
        }
        .jdgm-widget .jdgm-submit-rev:hover,
        .jdgm-widget button[type="submit"]:hover,
        .jdgm-widget .jdgm-write-rev-link:hover {
          background: var(--afp-primary-hover);
        }
        .jdgm-widget .jdgm-submit-rev:active,
        .jdgm-widget button[type="submit"]:active,
        .jdgm-widget .jdgm-write-rev-link:active {
          transform: translateY(1px);
        }

        .jdgm-widget .jdgm-cancel-rev,
        .jdgm-widget .jdgm-ask-que-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 18px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
          user-select: none;
          background: transparent;
          color: var(--afp-primary);
          border: 1px solid var(--afp-primary);
          text-decoration: none;
        }
        .jdgm-widget .jdgm-cancel-rev:hover,
        .jdgm-widget .jdgm-ask-que-link:hover {
          background: rgba(10, 75, 120, 0.06);
        }

        /* Button group spacing */
        .jdgm-widget .jdgm-form__actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 18px;
        }

        /* Messages / errors */
        .jdgm-widget .jdgm-notification {
          padding: 10px 12px;
          border-radius: var(--afp-radius-sm);
          background: #fff7ed;
          border: 1px solid #fdba74;
          color: #9a3412;
          font-size: 14px;
        }

        /* Reviews list spacing consistency */
        .jdgm-widget .jdgm-rev {
          border: 1px solid var(--afp-border);
          border-radius: var(--afp-radius);
          padding: 16px;
          margin: 12px 0;
          background: #fff;
          transition: all 0.2s ease;
        }

        .jdgm-widget .jdgm-rev:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border-color: var(--afp-accent);
        }

        /* Review Author */
        .jdgm-widget .jdgm-rev__author {
          color: var(--afp-primary);
          font-weight: 600;
          font-size: 1rem;
        }

        /* Review Date */
        .jdgm-widget .jdgm-rev__timestamp {
          color: var(--afp-muted);
          font-size: 0.875rem;
        }

        /* Review Title */
        .jdgm-widget .jdgm-rev__title {
          color: var(--afp-text);
          font-weight: 600;
          font-size: 1.125rem;
          margin: 0.5rem 0;
        }

        /* Review Body */
        .jdgm-widget .jdgm-rev__body {
          color: #374151;
          line-height: 1.6;
          font-size: 1rem;
        }

        /* Verified Badge */
        .jdgm-widget .jdgm-rev__badge {
          background: var(--afp-accent);
          color: white;
          border-radius: 0.375rem;
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        /* Review Photos */
        .jdgm-widget .jdgm-rev__pics {
          margin-top: 1rem;
        }

        .jdgm-widget .jdgm-rev__pic {
          border-radius: 0.5rem;
          overflow: hidden;
          border: 2px solid var(--afp-border);
          transition: all 0.2s;
        }

        .jdgm-widget .jdgm-rev__pic:hover {
          border-color: var(--afp-accent);
          transform: scale(1.05);
        }

        /* Helpful Votes */
        .jdgm-widget .jdgm-rev__votes {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--afp-border);
        }

        .jdgm-widget .jdgm-rev__vote-btn {
          color: var(--afp-muted);
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .jdgm-widget .jdgm-rev__vote-btn:hover {
          color: var(--afp-accent);
        }

        /* Pagination */
        .jdgm-widget .jdgm-paginate__page {
          border: 2px solid var(--afp-border);
          border-radius: 0.375rem;
          color: #374151;
          padding: 0.5rem 0.875rem;
          transition: all 0.2s;
        }

        .jdgm-widget .jdgm-paginate__page:hover,
        .jdgm-widget .jdgm-paginate__page--active {
          background: var(--afp-accent);
          border-color: var(--afp-accent);
          color: white;
        }

        /* Q&A Section */
        .jdgm-widget .jdgm-qna__question {
          background: white;
          border: 1px solid var(--afp-border);
          border-radius: var(--afp-radius);
          padding: 1.5rem;
          margin-bottom: 1rem;
        }

        .jdgm-widget .jdgm-qna__question-text {
          color: var(--afp-primary);
          font-weight: 600;
          font-size: 1.125rem;
        }

        .jdgm-widget .jdgm-qna__answer {
          background: #f9fafb;
          border-left: 3px solid var(--afp-accent);
          padding: 1rem;
          margin-top: 1rem;
          border-radius: 0.5rem;
        }

        /* Preview Badge (Star Rating) */
        .jdgm-preview-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .jdgm-preview-badge__stars {
          display: flex;
          gap: 0.125rem;
        }

        .jdgm-preview-badge__text {
          color: #374151;
          font-size: 0.875rem;
          font-weight: 500;
        }

        /* Loading State */
        .jdgm-spinner {
          border-color: var(--afp-accent);
          border-top-color: transparent;
        }

        /* Compact footer text */
        .jdgm-widget .jdgm-terms {
          font-size: 12px;
          color: var(--afp-muted);
          margin-top: 8px;
        }

        /* Mobile tweaks */
        @media (max-width: 639px) {
          .jdgm-write-review,
          .jdgm-rev-widg {
            padding: 16px;
            margin: 16px;
          }
          .jdgm-widget .jdgm-form__actions {
            width: 100%;
          }
          .jdgm-widget .jdgm-submit-rev,
          .jdgm-widget .jdgm-cancel-rev,
          .jdgm-widget .jdgm-write-rev-link,
          .jdgm-widget .jdgm-ask-que-link {
            flex: 1 1 auto;
          }
          .jdgm-widget .jdgm-rev {
            padding: 1rem;
          }
        }

        /* Desktop: two-column layout for name/email */
        @media (min-width: 640px) {
          .jdgm-widget .jdgm-form__author-wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  )
}
