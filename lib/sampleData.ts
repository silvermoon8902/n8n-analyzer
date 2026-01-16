// Sample analysis data for demo

export interface AnalysisCategory {
  name: string;
  score: number;
  status: 'pass' | 'warning' | 'fail';
  findings: Finding[];
}

export interface Finding {
  criterion: string;
  status: 'pass' | 'warning' | 'fail';
  reasoning: string;
  recommendation?: string;
}

export interface AnalysisReport {
  url: string;
  timestamp: string;
  overallScore: number;
  captureData: CaptureData;
  categories: AnalysisCategory[];
}

export interface CaptureData {
  screenshots: {
    desktop: string;
    mobile: string;
    fullPage: string;
  };
  lighthouse: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  metadata: {
    title: string;
    description: string;
    loadTime: number;
    domElements: number;
    cssFiles: number;
    jsFiles: number;
    images: number;
  };
}

export const sampleReport: AnalysisReport = {
  url: "https://example-website.com",
  timestamp: new Date().toISOString(),
  overallScore: 78,
  captureData: {
    screenshots: {
      desktop: "captured",
      mobile: "captured",
      fullPage: "captured"
    },
    lighthouse: {
      performance: 85,
      accessibility: 72,
      bestPractices: 90,
      seo: 88
    },
    metadata: {
      title: "Example Website - Modern Solutions",
      description: "A modern website showcasing quality design",
      loadTime: 2.4,
      domElements: 1247,
      cssFiles: 4,
      jsFiles: 12,
      images: 23
    }
  },
  categories: [
    {
      name: "Layout & Grid",
      score: 85,
      status: "pass",
      findings: [
        {
          criterion: "Consistent grid system",
          status: "pass",
          reasoning: "12-column grid detected with consistent gutters throughout"
        },
        {
          criterion: "Visual hierarchy",
          status: "pass",
          reasoning: "Clear content hierarchy with proper section separation"
        },
        {
          criterion: "Content alignment",
          status: "warning",
          reasoning: "Minor alignment inconsistencies in footer section",
          recommendation: "Align footer columns to match main grid"
        }
      ]
    },
    {
      name: "Spacing & Consistency",
      score: 72,
      status: "warning",
      findings: [
        {
          criterion: "Consistent margins",
          status: "warning",
          reasoning: "Detected 5 different margin values where 3 would suffice",
          recommendation: "Establish a spacing scale (8, 16, 24, 32, 48px)"
        },
        {
          criterion: "Padding consistency",
          status: "pass",
          reasoning: "Card padding is consistent across all components"
        },
        {
          criterion: "Vertical rhythm",
          status: "warning",
          reasoning: "Line heights vary inconsistently between sections"
        }
      ]
    },
    {
      name: "Typography",
      score: 90,
      status: "pass",
      findings: [
        {
          criterion: "Font hierarchy",
          status: "pass",
          reasoning: "Clear hierarchy with H1-H6 properly sized and weighted"
        },
        {
          criterion: "Readability",
          status: "pass",
          reasoning: "Body text at 16px with 1.6 line-height ensures readability"
        },
        {
          criterion: "Font pairing",
          status: "pass",
          reasoning: "Sans-serif heading + body combination is harmonious"
        }
      ]
    },
    {
      name: "Color System",
      score: 82,
      status: "pass",
      findings: [
        {
          criterion: "Color consistency",
          status: "pass",
          reasoning: "Limited palette of 5 colors used consistently"
        },
        {
          criterion: "Contrast ratios",
          status: "warning",
          reasoning: "Some gray text on white fails WCAG AA",
          recommendation: "Darken secondary text to #666 minimum"
        },
        {
          criterion: "Brand alignment",
          status: "pass",
          reasoning: "Primary colors align with logo and brand guidelines"
        }
      ]
    },
    {
      name: "UI Components",
      score: 88,
      status: "pass",
      findings: [
        {
          criterion: "Button consistency",
          status: "pass",
          reasoning: "All buttons follow same style with proper hover states"
        },
        {
          criterion: "Form elements",
          status: "pass",
          reasoning: "Inputs have consistent styling and focus states"
        },
        {
          criterion: "Card design",
          status: "pass",
          reasoning: "Cards use consistent shadows, borders, and padding"
        }
      ]
    },
    {
      name: "Navigation",
      score: 75,
      status: "warning",
      findings: [
        {
          criterion: "Menu clarity",
          status: "pass",
          reasoning: "Primary navigation is clear with 5 main items"
        },
        {
          criterion: "Mobile menu",
          status: "warning",
          reasoning: "Hamburger menu lacks animation, feels abrupt",
          recommendation: "Add slide-in animation for mobile menu"
        },
        {
          criterion: "Active states",
          status: "warning",
          reasoning: "Current page indicator is subtle, may be missed"
        }
      ]
    },
    {
      name: "Accessibility",
      score: 68,
      status: "warning",
      findings: [
        {
          criterion: "Alt text",
          status: "fail",
          reasoning: "7 of 23 images missing alt text",
          recommendation: "Add descriptive alt text to all meaningful images"
        },
        {
          criterion: "Keyboard navigation",
          status: "warning",
          reasoning: "Focus order mostly logical but modal traps focus"
        },
        {
          criterion: "ARIA labels",
          status: "pass",
          reasoning: "Interactive elements have appropriate ARIA labels"
        }
      ]
    },
    {
      name: "Responsiveness",
      score: 80,
      status: "pass",
      findings: [
        {
          criterion: "Breakpoints",
          status: "pass",
          reasoning: "Responsive at 768px, 1024px, and 1280px breakpoints"
        },
        {
          criterion: "Touch targets",
          status: "warning",
          reasoning: "Some buttons under 44px tap target on mobile",
          recommendation: "Increase mobile button padding"
        },
        {
          criterion: "Content reflow",
          status: "pass",
          reasoning: "Content stacks properly without horizontal scroll"
        }
      ]
    },
    {
      name: "Performance",
      score: 70,
      status: "warning",
      findings: [
        {
          criterion: "Load time",
          status: "warning",
          reasoning: "2.4s load time exceeds 2s target",
          recommendation: "Optimize images and defer non-critical JS"
        },
        {
          criterion: "Core Web Vitals",
          status: "warning",
          reasoning: "LCP at 2.8s, CLS at 0.15 need improvement"
        },
        {
          criterion: "Asset optimization",
          status: "pass",
          reasoning: "Images are WebP format with proper sizing"
        }
      ]
    },
    {
      name: "Content Quality",
      score: 85,
      status: "pass",
      findings: [
        {
          criterion: "Copy clarity",
          status: "pass",
          reasoning: "Headlines are clear and action-oriented"
        },
        {
          criterion: "CTA effectiveness",
          status: "pass",
          reasoning: "CTAs are prominent with compelling copy"
        },
        {
          criterion: "Content structure",
          status: "pass",
          reasoning: "Logical flow from problem to solution to action"
        }
      ]
    },
    {
      name: "Motion & Interactions",
      score: 65,
      status: "warning",
      findings: [
        {
          criterion: "Hover states",
          status: "pass",
          reasoning: "All interactive elements have hover feedback"
        },
        {
          criterion: "Transitions",
          status: "warning",
          reasoning: "Some transitions are too fast (under 150ms)",
          recommendation: "Use 200-300ms for smoother feel"
        },
        {
          criterion: "Reduced motion",
          status: "fail",
          reasoning: "No prefers-reduced-motion media query detected",
          recommendation: "Add reduced motion support for accessibility"
        }
      ]
    }
  ]
};

export const workflowSteps = [
  {
    id: 'input',
    name: 'URL Input',
    type: 'trigger',
    description: 'Webhook receives URL from user',
    icon: 'webhook',
    output: '{ "url": "https://..." }'
  },
  {
    id: 'validate',
    name: 'Validate URL',
    type: 'code',
    description: 'Sanitize and validate URL format',
    icon: 'code',
    output: '{ "url": "...", "valid": true }'
  },
  {
    id: 'screenshot-desktop',
    name: 'Desktop Screenshot',
    type: 'http',
    description: 'ScreenshotOne API @ 1920x1080',
    icon: 'monitor',
    output: '{ "image": "base64...", "viewport": "desktop" }'
  },
  {
    id: 'screenshot-mobile',
    name: 'Mobile Screenshot',
    type: 'http',
    description: 'ScreenshotOne API @ 375x812',
    icon: 'smartphone',
    output: '{ "image": "base64...", "viewport": "mobile" }'
  },
  {
    id: 'lighthouse',
    name: 'Lighthouse Audit',
    type: 'http',
    description: 'PageSpeed Insights API',
    icon: 'gauge',
    output: '{ "performance": 85, "accessibility": 72, ... }'
  },
  {
    id: 'html-capture',
    name: 'HTML Capture',
    type: 'http',
    description: 'Fetch rendered DOM structure',
    icon: 'code-2',
    output: '{ "html": "<!DOCTYPE...", "css": [...] }'
  },
  {
    id: 'merge',
    name: 'Merge Data',
    type: 'merge',
    description: 'Combine all capture results',
    icon: 'git-merge',
    output: '{ "screenshots": {...}, "lighthouse": {...}, "html": "..." }'
  },
  {
    id: 'ai-analysis',
    name: 'GPT-4 Vision Analysis',
    type: 'ai',
    description: 'Analyze against quality checklist',
    icon: 'brain',
    output: '{ "categories": [...], "overallScore": 78 }'
  },
  {
    id: 'format',
    name: 'Format JSON',
    type: 'code',
    description: 'Structure final report schema',
    icon: 'braces',
    output: '{ "report": {...} }'
  },
  {
    id: 'output',
    name: 'Return Report',
    type: 'respond',
    description: 'Send JSON response to webhook',
    icon: 'send',
    output: 'HTTP 200 + JSON Report'
  }
];

export const captureStrategies = [
  {
    name: "Screenshots",
    tools: ["ScreenshotOne API", "URLBox", "Puppeteer"],
    captures: [
      "Desktop viewport (1920x1080)",
      "Mobile viewport (375x812)",
      "Full page scroll capture",
      "Above-the-fold only"
    ],
    pros: ["Visual context for AI", "Catches rendering issues", "Shows actual user experience"],
    cons: ["Cookie banners may block", "Animations freeze at random state", "Large file sizes"]
  },
  {
    name: "Performance Data",
    tools: ["PageSpeed Insights API", "Lighthouse CI", "WebPageTest API"],
    captures: [
      "Core Web Vitals (LCP, FID, CLS)",
      "Performance score",
      "Accessibility audit",
      "Best practices check"
    ],
    pros: ["Objective metrics", "Industry standard", "Actionable recommendations"],
    cons: ["Doesn't show visual quality", "May differ from real users", "Rate limited"]
  },
  {
    name: "DOM/HTML Analysis",
    tools: ["Puppeteer", "Playwright", "Cheerio"],
    captures: [
      "Rendered HTML structure",
      "Computed CSS styles",
      "DOM element count",
      "Semantic markup analysis"
    ],
    pros: ["Detailed structure info", "Can check accessibility", "Finds hidden issues"],
    cons: ["No visual context", "Complex to parse", "May miss JS-rendered content"]
  }
];

export const edgeCaseHandlers = [
  {
    case: "Cookie Consent Banners",
    problem: "Banners block content in screenshots",
    solutions: [
      "Use ScreenshotOne's 'block_cookie_banners' option",
      "Inject CSS to hide common banner selectors",
      "Set cookies to mark consent before capture",
      "Use 'dismiss_modals' parameter in capture API"
    ],
    code: `// ScreenshotOne with cookie banner handling
{
  "url": "{{$json.url}}",
  "block_cookie_banners": true,
  "delay": 2000,
  "scripts": "document.querySelectorAll('[class*=cookie], [class*=consent]').forEach(e => e.remove())"
}`
  },
  {
    case: "Lazy-Loaded Images",
    problem: "Images not visible until scroll",
    solutions: [
      "Use full-page screenshot to trigger lazy load",
      "Scroll page via script before capture",
      "Wait for network idle",
      "Set scroll_to: 'bottom' in API"
    ],
    code: `// Scroll trigger for lazy loading
{
  "url": "{{$json.url}}",
  "full_page": true,
  "wait_until": "networkidle0",
  "scripts": "window.scrollTo(0, document.body.scrollHeight); await new Promise(r => setTimeout(r, 1000));"
}`
  },
  {
    case: "Animations & Loading States",
    problem: "Captures mid-animation or loading spinners",
    solutions: [
      "Add delay parameter (2-3 seconds)",
      "Wait for specific selector to appear",
      "Disable CSS animations via injected style",
      "Use 'wait_for_selector' option"
    ],
    code: `// Disable animations and wait
{
  "url": "{{$json.url}}",
  "delay": 3000,
  "styles": "*, *::before, *::after { animation: none !important; transition: none !important; }",
  "wait_for": ".hero-section"
}`
  },
  {
    case: "Auth-Protected Pages",
    problem: "Can't capture logged-in states",
    solutions: [
      "Pass session cookies in request headers",
      "Use stored auth tokens",
      "Create dedicated test account",
      "Capture from staging environment"
    ],
    code: `// With authentication cookies
{
  "url": "{{$json.url}}",
  "cookies": [
    {
      "name": "session_id",
      "value": "{{$credentials.sessionToken}}",
      "domain": ".example.com"
    }
  ]
}`
  }
];

export const jsonOutputSchema = {
  "url": "string - The analyzed URL",
  "timestamp": "ISO 8601 - When analysis was performed",
  "overallScore": "number (0-100) - Weighted average of all categories",
  "captureData": {
    "screenshots": {
      "desktop": "string - Base64 or URL of desktop screenshot",
      "mobile": "string - Base64 or URL of mobile screenshot",
      "fullPage": "string - Base64 or URL of full page capture"
    },
    "lighthouse": {
      "performance": "number (0-100)",
      "accessibility": "number (0-100)",
      "bestPractices": "number (0-100)",
      "seo": "number (0-100)"
    },
    "metadata": {
      "title": "string - Page title",
      "description": "string - Meta description",
      "loadTime": "number - Seconds to load",
      "domElements": "number - Total DOM nodes",
      "cssFiles": "number - External stylesheets",
      "jsFiles": "number - External scripts",
      "images": "number - Total images"
    }
  },
  "categories": [
    {
      "name": "string - Category name from checklist",
      "score": "number (0-100) - Category score",
      "status": "enum: pass | warning | fail",
      "findings": [
        {
          "criterion": "string - What was checked",
          "status": "enum: pass | warning | fail",
          "reasoning": "string - AI explanation",
          "recommendation": "string? - How to fix (if not pass)"
        }
      ]
    }
  ]
};
