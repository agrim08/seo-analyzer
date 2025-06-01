import React, { useState } from "react";
import { seo_analyzer } from "../config/ApiCall.js";

const Home = () => {
  const [targetUrl, setTargetUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [insights, setInsights] = useState(null);

  const handleFetch = async () => {
    if (!targetUrl.trim()) return;
    setLoading(true);
    setError(null);
    setInsights(null);

    try {
      const data = await seo_analyzer(targetUrl.trim());
      setInsights(data);
      setTargetUrl("");
    } catch (err) {
      setError("Failed to fetch SEO insights.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const interpretScore = (score, displayMode) => {
    if (displayMode === "notApplicable" || score === null) {
      return { label: "N/A", color: "gray", icon: "info" }
    }
    if (displayMode === "binary" && score === 1) {
      return { label: "Pass", color: "green", icon: "check" }
    }
    return { label: "Fail", color: "red", icon: "x" }
  }

  const getScoreColor = (score) => {
    if (score >= 90) return "text-emerald-600"
    if (score >= 70) return "text-amber-600"
    return "text-red-600"
  }

  const getScoreBg = (score) => {
    if (score >= 90) return "bg-emerald-50 border-emerald-200"
    if (score >= 70) return "bg-amber-50 border-amber-200"
    return "bg-red-50 border-red-200"
  }

  const getScoreRing = (score) => {
    if (score >= 90) return "ring-emerald-500"
    if (score >= 70) return "ring-amber-500"
    return "ring-red-500"
  }

  const getClasses = (color) => {
    const base = "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
    if (color === "green") return `${base} bg-emerald-100 text-emerald-700`
    if (color === "red") return `${base} bg-red-100 text-red-700`
    return `${base} bg-gray-100 text-gray-700`
  }

  const getIcon = (type, color) => {
    const baseClass = `w-4 h-4 ${
      color === "green" ? "text-emerald-600" : color === "red" ? "text-red-600" : "text-gray-500"
    }`

    if (type === "check") {
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    }
    if (type === "x") {
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    }
    return (
      <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    )
  }

  const overallScore = insights?.lighthouseResult?.categories?.seo?.score
    ? Math.round(insights.lighthouseResult.categories.seo.score * 100)
    : 0

  const auditResults = insights?.lighthouseResult?.categories?.seo?.auditRefs || []
  const passedAudits = auditResults.filter((ref) => {
    const audit = insights.lighthouseResult.audits[ref.id]
    return audit.score === 1 && audit.scoreDisplayMode === "binary"
  }).length

  const failedAudits = auditResults.filter((ref) => {
    const audit = insights.lighthouseResult.audits[ref.id]
    return audit.score === 0 && audit.scoreDisplayMode === "binary"
  }).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">SEO Analyzer</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get comprehensive SEO insights for any website.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="url"
                  placeholder="Enter website URL (e.g., https://example.com)"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleFetch()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                />
              </div>
              <button
                onClick={handleFetch}
                disabled={loading || !targetUrl.trim()}
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 min-w-[120px] ${
                  loading || !targetUrl.trim()
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md"
                }`}
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Analyzing
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Analyze SEO
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          </div>
        )}

        {insights && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className={`bg-white rounded-xl border-2 ${getScoreBg(overallScore)} p-6`}>
                <div className="mb-3">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full ring-4 ${getScoreRing(overallScore)} bg-white mb-3`}
                  >
                    <span className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}</span>
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Overall SEO Score</h3>
                <p className="text-xs text-gray-600">
                  {overallScore >= 90 ? "Excellent" : overallScore >= 70 ? "Good" : "Needs Work"}
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <div className="mb-3">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-3">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Tests Passed</h3>
                <p className="text-2xl font-bold text-emerald-600">{passedAudits}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <div className="mb-3">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-3">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Issues Found</h3>
                <p className="text-2xl font-bold text-red-600">{failedAudits}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">SEO Audit Details</h2>
                <p className="text-sm text-gray-600 mt-1">Detailed breakdown of all SEO factors analyzed</p>
              </div>

              <div className="p-6">
                <div className="space-y-3">
                  {auditResults.map((auditRef) => {
                    const audit = insights.lighthouseResult.audits[auditRef.id]
                    const { label, color, icon } = interpretScore(audit.score, audit.scoreDisplayMode)

                    return (
                      <div
                        key={audit.id}
                        className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                      >
                        <div className="flex-shrink-0 mt-0.5">{getIcon(icon, color)}</div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-900 truncate pr-4">{audit.title}</h3>
                            <span className={getClasses(color)}>
                              {getIcon(icon, color)}
                              {label}
                            </span>
                          </div>

                          {audit.description && (
                            <p className="text-xs text-gray-600 leading-relaxed text-left">{audit.description}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {!insights && !loading && !error && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Analyze</h3>
              <p className="text-gray-600 text-sm">
                Enter a website URL above to get started with comprehensive SEO analysis. 
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
