/* @ds-bundle: {"format":4,"namespace":"AutoSolutionsOSDesignSystem_884ce0","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"LiquidGlassButton","sourcePath":"components/core/LiquidGlassButton.jsx"},{"name":"MonoLabel","sourcePath":"components/core/MonoLabel.jsx"},{"name":"Skeleton","sourcePath":"components/core/Skeleton.jsx"},{"name":"AgendaRow","sourcePath":"components/data/AgendaRow.jsx"},{"name":"AnalogClock","sourcePath":"components/data/AnalogClock.jsx"},{"name":"BarChart","sourcePath":"components/data/BarChart.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"ListRow","sourcePath":"components/data/ListRow.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"SegmentBars","sourcePath":"components/data/SegmentBars.jsx"},{"name":"SeriesDot","sourcePath":"components/data/SeriesDot.jsx"},{"name":"StatBlock","sourcePath":"components/data/StatBlock.jsx"},{"name":"TaskRow","sourcePath":"components/data/TaskRow.jsx"},{"name":"Loader","sourcePath":"components/feedback/Loader.jsx"},{"name":"Modal","sourcePath":"components/feedback/Modal.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"DropdownMenu","sourcePath":"components/forms/DropdownMenu.jsx"},{"name":"DropdownMenuItem","sourcePath":"components/forms/DropdownMenu.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"NavItem","sourcePath":"components/navigation/NavItem.jsx"},{"name":"SearchField","sourcePath":"components/navigation/SearchField.jsx"},{"name":"SegmentedControl","sourcePath":"components/navigation/SegmentedControl.jsx"},{"name":"SideRail","sourcePath":"components/navigation/SideRail.jsx"},{"name":"TopBar","sourcePath":"components/navigation/TopBar.jsx"},{"name":"AmbientBackground","sourcePath":"components/surfaces/AmbientBackground.jsx"},{"name":"AppTile","sourcePath":"components/surfaces/AppTile.jsx"},{"name":"BusinessCard","sourcePath":"components/surfaces/BusinessCard.jsx"},{"name":"DarkPanel","sourcePath":"components/surfaces/DarkPanel.jsx"},{"name":"DarkPanelRow","sourcePath":"components/surfaces/DarkPanel.jsx"},{"name":"GlassCard","sourcePath":"components/surfaces/GlassCard.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"0ab036ed82fe","components/core/Badge.jsx":"dab7962799c8","components/core/Button.jsx":"f6682fe8b3b6","components/core/Icon.jsx":"54daa82ee38f","components/core/IconButton.jsx":"2a20d06c9958","components/core/LiquidGlassButton.jsx":"77899e8e1ffa","components/core/MonoLabel.jsx":"5f4cff06f4d7","components/core/Skeleton.jsx":"a3ab345918a1","components/data/AgendaRow.jsx":"1b52939ce0bb","components/data/AnalogClock.jsx":"07968638293f","components/data/BarChart.jsx":"de301b8f2d93","components/data/DataTable.jsx":"05d7de843b10","components/data/ListRow.jsx":"eb31c69784a1","components/data/ProgressBar.jsx":"f1f6dd9bccf4","components/data/SegmentBars.jsx":"0aca4e439adc","components/data/SeriesDot.jsx":"4da01fc6ea16","components/data/StatBlock.jsx":"abff2317504c","components/data/TaskRow.jsx":"479a15b99efb","components/feedback/Loader.jsx":"a4b50b936e3f","components/feedback/Modal.jsx":"dfd1788ad453","components/forms/Checkbox.jsx":"95ae5d669b73","components/forms/DropdownMenu.jsx":"1ce6d92e0d46","components/forms/TextField.jsx":"56971d918c29","components/navigation/NavItem.jsx":"5a0e840fd5bc","components/navigation/SearchField.jsx":"92b25fad1f6c","components/navigation/SegmentedControl.jsx":"6da5c1340083","components/navigation/SideRail.jsx":"4c816d66a0e9","components/navigation/TopBar.jsx":"bdd4effb8012","components/surfaces/AmbientBackground.jsx":"14939cb72a76","components/surfaces/AppTile.jsx":"45e9ba2c423c","components/surfaces/BusinessCard.jsx":"d881e32b0901","components/surfaces/DarkPanel.jsx":"02dfdc3c269d","components/surfaces/GlassCard.jsx":"bc3c5bd8bea7","doc-page.js":"371bab66f42d","ui_kits/entry/BootScreen.jsx":"e0229b90a8e8","ui_kits/entry/EntryFlow.jsx":"cf9a0d475949","ui_kits/workspace/ModulesA.jsx":"02f07caa5737","ui_kits/workspace/ModulesB.jsx":"25aa40c3aa78","ui_kits/workspace/PersonalHub.jsx":"bb74d042e812","ui_kits/workspace/Workspace.jsx":"301c52c11b71"},"inlinedExternals":[],"unexposedExports":[{"name":"seriesColor","sourcePath":"components/data/SeriesDot.jsx"}]} */

(() => {

const __ds_ns = (window.AutoSolutionsOSDesignSystem_884ce0 = window.AutoSolutionsOSDesignSystem_884ce0 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Round avatar. With no image it is a flat warm-grey disc with a hairline —
   the source never draws a generated pattern or a coloured initial chip. */
function Avatar({
  src,
  initials,
  size = 32,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: size + 'px',
      height: size + 'px',
      flexShrink: 0,
      borderRadius: 'var(--radius-round)',
      background: src ? 'center/cover no-repeat url(' + src + ')' : 'var(--paper-250)',
      border: '1px solid var(--paper-400)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-mono-alt)',
      fontSize: Math.round(size * 0.34) + 'px',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--muted)',
      overflow: 'hidden',
      ...style
    }
  }, rest), !src && initials ? initials : null);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Status pill. accent = the one thing that matters (unread count, WRITE
   permission); outline = neutral state; tint = soft accent wash; onDark for
   use inside a DarkPanel; verdict = the canonical scored chip. */
function Badge({
  children,
  tone = 'outline',
  mono = true,
  label,
  score,
  style,
  ...rest
}) {
  const tones = {
    accent: {
      background: 'var(--tenant-accent, var(--accent))',
      color: 'var(--text-on-accent)',
      border: 'none'
    },
    verdict: {
      background: 'var(--tenant-accent, var(--accent))',
      color: 'var(--text-on-accent)',
      border: 'none'
    },
    verdictLow: {
      background: 'var(--muted-08)',
      color: 'var(--paper-800)',
      border: 'none'
    },
    tint: {
      background: 'var(--tenant-tint, var(--accent-tint))',
      color: 'var(--muted)',
      border: '1px solid var(--tenant-border, var(--muted-25))'
    },
    outline: {
      background: 'transparent',
      color: 'var(--muted)',
      border: '1px solid var(--paper-400)'
    },
    onDark: {
      background: 'transparent',
      color: 'var(--on-dark-tertiary)',
      border: '1px solid var(--on-dark-line)'
    },
    onVideo: {
      background: 'transparent',
      color: 'var(--on-dark-strong)',
      border: '1px solid var(--on-dark-secondary)'
    }
  };
  const t = tones[tone] || tones.outline;
  const verdict = tone === 'verdict' || tone === 'verdictLow';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      gap: verdict ? '5px' : 0,
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-display)',
      fontSize: 'var(--text-caption)',
      fontWeight: mono ? 'var(--weight-light)' : 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-label-sm)',
      textTransform: 'uppercase',
      borderRadius: 'var(--radius-pill)',
      padding: '2px 8px',
      lineHeight: 1.5,
      ...t,
      ...style
    }
  }, rest), verdict ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.55
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: 'tabular-nums'
    }
  }, score)) : children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  primary: {
    bg: 'var(--ink)',
    color: 'var(--text-on-ink)',
    border: '1px solid var(--ink)'
  },
  secondary: {
    bg: 'var(--surface-solid)',
    color: 'var(--muted)',
    border: '1px solid var(--muted-25)'
  },
  ghost: {
    bg: 'transparent',
    color: 'var(--muted)',
    border: '1px solid transparent'
  },
  accent: {
    bg: 'var(--tenant-accent, var(--accent))',
    color: 'var(--text-on-accent)',
    border: '1px solid transparent'
  }
};
const SIZES = {
  sm: 30,
  md: 32,
  lg: 34,
  xl: 42
};

/* Pill button. The workspace uses radius 99px; shape="field" drops to the
   4px paper radius used by the sign-in form. */
function Button({
  children,
  tone = 'primary',
  size = 'md',
  shape = 'pill',
  block = false,
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const t = TONES[tone] || TONES.primary;
  const h = SIZES[size] || SIZES.md;
  const hoverStyle = disabled ? null : tone === 'primary' ? {
    background: '#3A3A3E'
  } : tone === 'secondary' ? {
    borderColor: 'var(--ink)',
    color: 'var(--ink)'
  } : tone === 'ghost' ? {
    color: 'var(--ink)'
  } : {
    filter: 'brightness(0.96)'
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      height: h + 'px',
      padding: shape === 'pill' ? '0 14px' : '0 16px',
      width: block ? '100%' : undefined,
      display: block ? 'flex' : 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      background: t.bg,
      color: t.color,
      border: t.border,
      borderRadius: shape === 'pill' ? 'var(--radius-pill)' : 'var(--radius-field)',
      fontFamily: 'var(--font-display)',
      fontSize: size === 'xl' ? 'var(--text-body)' : 'var(--text-body)',
      fontWeight: shape === 'pill' ? 'var(--weight-medium)' : 'var(--weight-semibold)',
      letterSpacing: 'var(--tracking-tight)',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      userSelect: 'none',
      whiteSpace: 'nowrap',
      transition: 'background-color var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard)',
      ...(hover ? hoverStyle : null),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CDN = 'https://cdn.jsdelivr.net/npm/lucide-static@0.544.0/icons/';
const cache = {};

/* Lucide glyph, fetched once and inlined so it inherits currentColor.
   Until it resolves — and if it never does — it falls back to the hairline
   placeholder square the current build actually ships. */
function Icon({
  name,
  size = 14,
  strokeWidth = 'normal',
  color = 'currentColor',
  style,
  ...rest
}) {
  const [svg, setSvg] = React.useState(() => cache[name] || null);
  React.useEffect(() => {
    let live = true;
    if (cache[name]) {
      setSvg(cache[name]);
      return undefined;
    }
    fetch(CDN + name + '.svg').then(r => r.ok ? r.text() : Promise.reject(r.status)).then(t => {
      const cleaned = t.replace(/<svg /, '<svg style="width:100%;height:100%;display:block" ').replace(/stroke="[^"]*"/g, 'stroke="currentColor"').replace(/stroke-width="[^"]*"/g, 'stroke-width="1.75"');
      cache[name] = cleaned;
      if (live) setSvg(cleaned);
    }).catch(() => {});
    return () => {
      live = false;
    };
  }, [name]);
  const box = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size + 'px',
    height: size + 'px',
    flexShrink: 0,
    color,
    opacity: strokeWidth === 'thin' ? 0.55 : 1,
    ...style
  };
  if (!svg) {
    return /*#__PURE__*/React.createElement("span", _extends({
      role: "img",
      "aria-label": name,
      style: box
    }, rest), /*#__PURE__*/React.createElement("span", {
      style: {
        width: '100%',
        height: '100%',
        border: '1.5px solid currentColor',
        borderRadius: '3px'
      }
    }));
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "img",
    "aria-label": name,
    style: box,
    dangerouslySetInnerHTML: {
      __html: svg
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Round icon button. Light = solid white with a dark glyph; dark = ink fill
   with a white glyph. Glyphs sit at 13-15px, thin stroke. */
function IconButton({
  children,
  tone = 'light',
  size = 32,
  onClick,
  title,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    title: title,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: size + 'px',
      height: size + 'px',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-round)',
      border: tone === 'outline' ? '1px solid var(--muted-25)' : 'none',
      background: dark ? 'var(--ink)' : 'var(--surface-solid)',
      color: dark ? 'var(--text-on-ink)' : 'var(--ink)',
      cursor: 'pointer',
      padding: 0,
      transition: 'opacity var(--dur-fast) var(--ease-standard)',
      opacity: hover ? 0.78 : 1,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/LiquidGlassButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let filterMounted = false;

/* The entry-screen call to action: a transparent pill whose edge is drawn
   entirely with inset highlights over a refracting backdrop blur. Only ever
   used over the video hero — it needs something behind it to bend. */
function LiquidGlassButton({
  children,
  onClick,
  height = 48,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [supportsRefract, setSupportsRefract] = React.useState(false);
  React.useEffect(() => {
    filterMounted = true;
    try {
      setSupportsRefract(CSS.supports('backdrop-filter', 'url("#as-container-glass")'));
    } catch (e) {
      setSupportsRefract(false);
    }
  }, []);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      isolation: 'isolate',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      height: height + 'px',
      padding: '0 30px',
      background: 'transparent',
      border: 0,
      borderRadius: 'var(--radius-round)',
      color: '#ffffff',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-control)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-tight)',
      cursor: 'pointer',
      transform: hover ? 'var(--motion-hover-grow)' : 'none',
      transition: 'transform var(--dur-slow) var(--ease-out-expo)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 'var(--radius-round)',
      pointerEvents: 'none',
      boxShadow: hover ? 'var(--shadow-lg-btn-hover)' : 'var(--shadow-lg-btn)',
      transition: 'box-shadow var(--dur-slow) var(--ease-standard)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      borderRadius: 'var(--radius-round)',
      overflow: 'hidden',
      background: hover ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.32)',
      backdropFilter: supportsRefract ? 'url("#as-container-glass") blur(0.6px)' : 'blur(3px) saturate(150%)',
      WebkitBackdropFilter: 'blur(3px) saturate(150%)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      zIndex: 10,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      pointerEvents: 'none',
      textShadow: '0 1px 10px rgba(0,0,0,0.35)'
    }
  }, children), /*#__PURE__*/React.createElement("svg", {
    width: "0",
    height: "0",
    style: {
      position: 'absolute',
      pointerEvents: 'none'
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("filter", {
    id: "as-container-glass",
    x: "0%",
    y: "0%",
    width: "100%",
    height: "100%",
    colorInterpolationFilters: "sRGB"
  }, /*#__PURE__*/React.createElement("feTurbulence", {
    type: "fractalNoise",
    baseFrequency: "0.05 0.05",
    numOctaves: "1",
    seed: "1",
    result: "turbulence"
  }), /*#__PURE__*/React.createElement("feGaussianBlur", {
    in: "turbulence",
    stdDeviation: "2",
    result: "blurredNoise"
  }), /*#__PURE__*/React.createElement("feDisplacementMap", {
    in: "SourceGraphic",
    in2: "blurredNoise",
    scale: "70",
    xChannelSelector: "R",
    yChannelSelector: "B",
    result: "displaced"
  }), /*#__PURE__*/React.createElement("feGaussianBlur", {
    in: "displaced",
    stdDeviation: "4",
    result: "finalBlur"
  }), /*#__PURE__*/React.createElement("feComposite", {
    in: "finalBlur",
    in2: "finalBlur",
    operator: "over"
  })))));
}
Object.assign(__ds_scope, { LiquidGlassButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/LiquidGlassButton.jsx", error: String((e && e.message) || e) }); }

// components/core/MonoLabel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TRACK = {
  lg: 'var(--tracking-label)',
  md: 'var(--tracking-label-sm)',
  sm: 'var(--tracking-label-xs)'
};

/* The eyebrow. Uppercase, letterspaced micro-label that sits above every page
   title, above every card group, and in every table header. Never sentence
   case. The name is historical — the role is carried by Roboto Light 300,
   uppercase and tracked, not by a monospaced face. 300 is legal HERE and
   nowhere else: uppercase with wide tracking holds light glyphs apart,
   where sentence-case copy at 300 would go soft. Figures are tabular so
   counts and timestamps stay aligned in a column. */
function MonoLabel({
  children,
  tone = 'muted',
  track = 'lg',
  size = 'var(--text-caption)',
  style,
  ...rest
}) {
  const color = tone === 'accent' ? 'var(--tenant-accent, var(--accent))' : tone === 'ink' ? 'var(--ink)' : tone === 'onDark' ? 'var(--on-dark-secondary)' : 'var(--muted)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: size,
      fontWeight: 'var(--weight-light)',
      color,
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: TRACK[track] || TRACK.lg,
      textTransform: 'uppercase',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { MonoLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MonoLabel.jsx", error: String((e && e.message) || e) }); }

// components/core/Skeleton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The wireframe fill. Every unlabelled row, cell and metric in the product is
   a flat warm-grey bar — content is deliberately not faked. strong = the
   primary column, weak = everything else. */
function Skeleton({
  width = '100%',
  height = 8,
  tone = 'weak',
  radius = 'var(--radius-skeleton)',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: typeof width === 'number' ? width + 'px' : width,
      height: typeof height === 'number' ? height + 'px' : height,
      background: tone === 'strong' ? 'var(--skeleton-strong)' : tone === 'onDark' ? 'var(--on-dark-bar)' : tone === 'onDarkWeak' ? 'var(--on-dark-well)' : 'var(--skeleton-weak)',
      borderRadius: radius,
      flexShrink: 0,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/data/AnalogClock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const pad = n => n < 10 ? '0' + n : '' + n;

/* 40px world-clock face. Hairline ring, four ticks, ink hour and minute
   hands, accent second hand and centre pin. Daylight fills white; night
   drops to paper-100 and the city dot goes grey.
   labelTone="display" sets the city in Google Sans semibold at --ink above
   the face — the mono grey default disappears at the top of a well. */
function AnalogClock({
  timeZone = 'Australia/Melbourne',
  city,
  labelTone = 'mono',
  size = 40,
  now,
  style,
  ...rest
}) {
  const [tick, setTick] = React.useState(() => now || Date.now());
  React.useEffect(() => {
    if (now) return undefined;
    const id = setInterval(() => setTick(Date.now()), 1000);
    return () => clearInterval(id);
  }, [now]);
  const d = new Date(now || tick);
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(d).split(':').map(Number);
  const h = parts[0] % 12,
    mi = parts[1],
    sec = parts[2];
  const night = parts[0] < 7 || parts[0] >= 19;
  const time = pad(parts[0]) + ':' + pad(mi);
  const day = new Intl.DateTimeFormat('en-AU', {
    timeZone,
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  }).format(d);
  const hand = (deg, len, w, color, radius) => ({
    position: 'absolute',
    left: '50%',
    bottom: '50%',
    width: w,
    height: len,
    background: color,
    borderRadius: radius || '2px',
    transformOrigin: '50% 100%',
    transform: 'translateX(-50%) rotate(' + deg + 'deg)'
  });
  const tickStyle = pos => Object.assign({
    position: 'absolute',
    background: 'var(--paper-400)'
  }, pos);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      minWidth: 0,
      ...style
    }
  }, rest), city ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '7px',
      height: '7px',
      borderRadius: 'var(--radius-round)',
      flexShrink: 0,
      background: night ? 'var(--paper-600)' : 'var(--tenant-accent, var(--accent))'
    }
  }), labelTone === 'display' ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: 'var(--text-caption)',
      lineHeight: '18px',
      color: 'var(--ink)',
      letterSpacing: 'var(--tracking-label-sm)',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, city) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-light)',
      fontSize: 'var(--text-caption)',
      lineHeight: '18px',
      color: 'var(--muted)',
      letterSpacing: 'var(--tracking-label-sm)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, city)) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size + 'px',
      height: size + 'px',
      flexShrink: 0,
      borderRadius: 'var(--radius-round)',
      border: '1px solid var(--border-strong)',
      background: night ? 'var(--paper-100)' : 'var(--surface-solid)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: tickStyle({
      top: '3px',
      left: '50%',
      marginLeft: '-0.5px',
      width: '1px',
      height: '4px'
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: tickStyle({
      bottom: '3px',
      left: '50%',
      marginLeft: '-0.5px',
      width: '1px',
      height: '4px'
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: tickStyle({
      right: '3px',
      top: '50%',
      marginTop: '-0.5px',
      height: '1px',
      width: '4px'
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: tickStyle({
      left: '3px',
      top: '50%',
      marginTop: '-0.5px',
      height: '1px',
      width: '4px'
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: hand((h + mi / 60) * 30, '10px', '2.5px', 'var(--paper-900)')
  }), /*#__PURE__*/React.createElement("div", {
    style: hand((mi + sec / 60) * 6, '14px', '2px', 'var(--paper-900)')
  }), /*#__PURE__*/React.createElement("div", {
    style: hand(sec * 6, '15px', '1px', 'var(--tenant-accent, var(--accent))', '1px')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '4px',
      height: '4px',
      marginLeft: '-2px',
      marginTop: '-2px',
      borderRadius: 'var(--radius-round)',
      background: 'var(--tenant-accent, var(--accent))'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lead)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-display)',
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1
    }
  }, time), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--muted)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, day))));
}
Object.assign(__ds_scope, { AnalogClock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/AnalogClock.jsx", error: String((e && e.message) || e) }); }

// components/data/BarChart.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Rounded bars, 6px on all corners, ~14% category gap. No gridlines, no axis
   lines, no Y axis. Every bar is ink; exactly one is accent — the one the eye
   should land on. */
function BarChart({
  values = [],
  accentIndex = -1,
  height = 120,
  caption,
  style,
  ...rest
}) {
  const max = Math.max(1, ...values);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      minWidth: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      height: height + 'px',
      display: 'flex',
      alignItems: 'flex-end',
      gap: '14%'
    }
  }, values.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: Math.round(v / max * 100) + '%',
      background: i === accentIndex ? 'var(--tenant-accent, var(--accent))' : 'var(--ink)',
      borderRadius: 'var(--radius-md)'
    }
  }))), caption ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-light)',
      fontSize: 'var(--text-caption)',
      color: 'var(--muted)',
      letterSpacing: 'var(--tracking-label-sm)',
      textTransform: 'uppercase'
    }
  }, caption) : null);
}
Object.assign(__ds_scope, { BarChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/BarChart.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Column-grid table. The header is mono, uppercase and muted with a
   paper-300 rule under it; body rows are divided by the lighter paper-150.
   Cells accept nodes, so a row of Skeletons is a valid row. */
function DataTable({
  columns = [],
  rows = [],
  template,
  dense = false,
  style,
  ...rest
}) {
  const cols = template || columns.map((c, i) => i === 0 ? '2fr' : '1fr').join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: cols,
      gap: '12px',
      padding: '0 0 10px',
      borderBottom: '1px solid var(--border-inner)',
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-light)',
      fontSize: 'var(--text-caption)',
      color: 'var(--muted)',
      letterSpacing: 'var(--tracking-label-sm)',
      textTransform: 'uppercase'
    }
  }, columns.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, c))), rows.map((row, r) => /*#__PURE__*/React.createElement("div", {
    key: r,
    style: {
      display: 'grid',
      gridTemplateColumns: cols,
      gap: '12px',
      padding: dense ? '10px 0' : '12px 0',
      borderBottom: r === rows.length - 1 ? 'none' : '1px solid var(--border-row)',
      alignItems: 'center',
      fontSize: 'var(--text-body)'
    }
  }, row.map((cell, c) => /*#__PURE__*/React.createElement("div", {
    key: c,
    style: {
      minWidth: 0
    }
  }, cell)))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* 10px pill track with an accent fill. The label row above uses body text on
   the left and a mono percentage on the right. tone="muted" for the
   secondary series (best case) so only one bar per card is accent. */
function ProgressBar({
  label,
  value = 0,
  display,
  tone = 'accent',
  height = 10,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      minWidth: 0,
      ...style
    }
  }, rest), label || display ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--muted)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-light)',
      fontSize: 'var(--text-caption)',
      color: 'var(--muted)'
    }
  }, display != null ? display : value + '%')) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: height + 'px',
      background: 'var(--paper-150)',
      borderRadius: 'var(--radius-pill)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: Math.max(0, Math.min(100, value)) + '%',
      height: '100%',
      background: tone === 'accent' ? 'var(--tenant-accent, var(--accent))' : 'var(--paper-250)'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/SegmentBars.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SHADES_LIGHT = ['var(--paper-350)', 'var(--paper-250)', 'var(--paper-200)'];
const SHADES_DARK = ['rgba(255,255,255,0.75)', 'rgba(255,255,255,0.45)', 'rgba(255,255,255,0.22)'];

/* Proportional segment strip. A row of 6px pills whose flex weights encode
   real percentages — the module-mix readout on every company card. A zero
   weight is omitted, never rendered as an empty sliver. */
function SegmentBars({
  weights = [3, 2, 1],
  tone = 'light',
  height = 6,
  style,
  ...rest
}) {
  const shades = tone === 'dark' ? SHADES_DARK : SHADES_LIGHT;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: '6px',
      ...style
    }
  }, rest), weights.map((w, i) => w ? /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: height + 'px',
      flex: w,
      background: shades[i % shades.length],
      borderRadius: 'var(--radius-pill)'
    }
  }) : null));
}
Object.assign(__ds_scope, { SegmentBars });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/SegmentBars.jsx", error: String((e && e.message) || e) }); }

// components/data/SeriesDot.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Categorical identity dot. Series colour says WHICH SOURCE; the accent says
   LOOK HERE — a row may carry both and still obey "one accent moment per
   card", because the dot is not accent.
   Assign the index POSITIONALLY, never from a hash: a hash lets two items
   collide, which defeats the point. hollow is the colour-coding-off state. */
function SeriesDot({
  index = 0,
  size = 8,
  hollow = false,
  style,
  ...rest
}) {
  const n = Math.abs(Math.floor(index)) % 8 + 1;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      width: size + 'px',
      height: size + 'px',
      flexShrink: 0,
      borderRadius: 'var(--radius-round)',
      background: hollow ? 'transparent' : 'var(--series-' + n + ')',
      border: hollow ? '1px solid var(--muted-40)' : 'none',
      ...style
    }
  }, rest));
}

/* The colour a given series index resolves to — for spines, event blocks and
   anywhere the dot itself is not the right shape. */
function seriesColor(index = 0) {
  return 'var(--series-' + (Math.abs(Math.floor(index)) % 8 + 1) + ')';
}
Object.assign(__ds_scope, { SeriesDot, seriesColor });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/SeriesDot.jsx", error: String((e && e.message) || e) }); }

// components/data/AgendaRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Agenda entry. A 52px mono time gutter, a 3px vertical spine, then title and
   meta. The spine is the accent only for the event happening now; in a merged
   calendar it carries the source's series colour instead. */
function AgendaRow({
  time,
  title,
  meta,
  now = false,
  series,
  style,
  ...rest
}) {
  const spine = now ? 'var(--tenant-accent, var(--accent))' : series != null ? __ds_scope.seriesColor(series) : 'var(--tenant-bar, var(--ink))';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: '12px',
      alignItems: 'stretch',
      minWidth: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-caption)',
      color: 'var(--muted)',
      width: '52px',
      flexShrink: 0,
      paddingTop: '1px'
    }
  }, time), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '3px',
      borderRadius: 'var(--radius-pill)',
      flexShrink: 0,
      background: spine
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-body)',
      fontWeight: 'var(--weight-medium)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title), meta ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--muted)'
    }
  }, meta) : null));
}
Object.assign(__ds_scope, { AgendaRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/AgendaRow.jsx", error: String((e && e.message) || e) }); }

// components/data/ListRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Inbox / integration row. A 7px unread pip, a two-line body, and a mono
   timestamp pinned right. Unread rows sit on the inset paper fill and go
   semibold; read rows are white and medium.
   In a merged view, `series` adds the source's identity dot and `spine`
   adds a 3px full-height edge — accent for needs-attention, series colour
   otherwise. */
function ListRow({
  title,
  subtitle,
  time,
  unread = false,
  trailing,
  series,
  spine,
  onClick,
  style,
  ...rest
}) {
  const spineColor = spine === 'accent' ? 'var(--tenant-accent, var(--accent))' : spine === true || spine === 'series' ? __ds_scope.seriesColor(series || 0) : null;
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    style: {
      display: 'flex',
      gap: '12px',
      alignItems: 'stretch',
      padding: 'var(--row-pad)',
      borderBottom: '1px solid var(--border-row)',
      background: unread ? 'var(--surface-inset)' : 'var(--surface-solid)',
      minWidth: 0,
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }
  }, rest), spineColor ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: '3px',
      flexShrink: 0,
      borderRadius: 'var(--radius-pill)',
      background: spineColor
    }
  }) : null, series != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: '8px',
      height: '8px',
      flexShrink: 0,
      marginTop: '6px',
      borderRadius: 'var(--radius-round)',
      background: __ds_scope.seriesColor(series)
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: '7px',
      height: '7px',
      borderRadius: 'var(--radius-round)',
      marginTop: '6px',
      flexShrink: 0,
      background: unread ? 'var(--tenant-accent, var(--accent))' : 'transparent',
      border: unread ? 'none' : '1px solid var(--paper-400)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '3px',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-body)',
      fontWeight: unread ? 'var(--weight-semibold)' : 'var(--weight-medium)',
      color: 'var(--paper-900)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title), time ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-light)',
      fontSize: 'var(--text-caption)',
      color: 'var(--muted)',
      flexShrink: 0
    }
  }, time) : null), subtitle ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--muted)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, subtitle) : null), trailing ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0
    }
  }, trailing) : null);
}
Object.assign(__ds_scope, { ListRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ListRow.jsx", error: String((e && e.message) || e) }); }

// components/data/StatBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Icon in a muted rounded badge, then a very large number, then a 12px label.
   Stacked, left aligned, no card of its own — it always lives inside a
   GlassCard. Pass skeleton to render the un-numbered wireframe state. */
function StatBlock({
  icon,
  value,
  label,
  skeleton = false,
  skeletonWidth = '70%',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      alignItems: 'flex-start',
      minWidth: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '32px',
      height: '32px',
      borderRadius: 'var(--radius-icon-badge)',
      background: 'var(--muted-15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, icon || /*#__PURE__*/React.createElement("div", {
    style: {
      width: '13px',
      height: '13px',
      border: '1.5px solid var(--muted)',
      borderRadius: '3px'
    }
  })), skeleton ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: '36px',
      width: skeletonWidth,
      background: 'var(--ink)',
      borderRadius: 'var(--radius-md)'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-metric)',
      color: 'var(--ink)',
      letterSpacing: 'var(--tracking-display)'
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--muted)'
    }
  }, label));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Loader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The in-product spinner is an animated GIF of the OS mark, not a CSS ring.
   Point src at assets/loading.gif with the right relative path, or set
   window.__AS_ASSET_BASE__ once per page. */
function Loader({
  size = 22,
  src,
  label,
  style,
  ...rest
}) {
  const base = typeof window !== 'undefined' && window.__AS_ASSET_BASE__ || 'assets/';
  const url = src || base + 'loading.gif';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: size + 'px',
      height: size + 'px',
      flexShrink: 0,
      backgroundImage: 'url(' + url + ')',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }
  }), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Loader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Loader.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Modal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Centred dialog on a blurred black scrim. Over the video hero the sheet is
   glass (white/20 fill, white/34 edge, 18px radius, white type); inside the
   workspace pass tone="paper" for the solid white sheet.
   Both planes take their blur on a layer behind the content rather than on
   the content element: backdrop-filter composites the whole subtree, and on
   a dialog that means every word of the sign-in copy renders soft. */
function Modal({
  open = true,
  tone = 'glass',
  width = 400,
  onDismiss,
  children,
  style,
  ...rest
}) {
  if (!open) return null;
  const glass = tone === 'glass';
  return /*#__PURE__*/React.createElement("div", {
    onClick: onDismiss,
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 20,
      isolation: 'isolate',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'var(--scrim-dialog)',
      animation: 'as-fade 240ms ease both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      pointerEvents: 'none',
      backdropFilter: 'var(--blur-scrim)',
      WebkitBackdropFilter: 'var(--blur-scrim)'
    }
  }), /*#__PURE__*/React.createElement("div", _extends({
    onClick: e => e.stopPropagation(),
    style: {
      position: 'relative',
      isolation: 'isolate',
      width: 'min(' + width + 'px, 100%)',
      background: glass ? 'var(--glass-dialog-fill)' : 'var(--surface-solid)',
      border: '1px solid ' + (glass ? 'var(--glass-dialog-edge)' : 'var(--paper-400)'),
      borderRadius: glass ? 'var(--radius-dialog)' : 'var(--radius-paper-card)',
      boxShadow: 'var(--shadow-dialog)',
      color: glass ? '#ffffff' : 'var(--ink)',
      padding: '26px 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: '22px',
      animation: 'as-rise 320ms cubic-bezier(0.22,1,0.36,1) both',
      ...style
    }
  }, rest), glass ? /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      zIndex: -1,
      pointerEvents: 'none',
      backdropFilter: 'var(--blur-dialog)',
      WebkitBackdropFilter: 'var(--blur-dialog)'
    }
  }) : null, children));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Modal.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* 16px square, 3px radius. Unchecked is white with a paper-500 hairline;
   checked fills with the tenant accent and carries a white tick. */
function Checkbox({
  checked = false,
  onChange,
  size = 16,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onChange,
    style: {
      width: size + 'px',
      height: size + 'px',
      flexShrink: 0,
      borderRadius: '3px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '11px',
      lineHeight: 1,
      color: '#FFFFFF',
      background: checked ? 'var(--tenant-accent, var(--accent))' : 'var(--surface-solid)',
      border: '1px solid ' + (checked ? 'var(--tenant-accent, var(--accent))' : 'var(--paper-500)'),
      cursor: onChange ? 'pointer' : 'default',
      userSelect: 'none',
      ...style
    }
  }, rest), checked ? '\u2713' : '');
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/data/TaskRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Checkbox, label, and a mono due tag. Done strikes the label through and
   drops it to paper-700 — the row stays in place, it never disappears.
   `series` adds the source's identity dot for merged task lists. */
function TaskRow({
  title,
  due,
  done = false,
  series,
  onToggle,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onToggle,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '7px 4px',
      borderRadius: 'var(--radius-field)',
      cursor: onToggle ? 'pointer' : 'default',
      minWidth: 0,
      background: hover ? 'var(--surface-inset)' : 'transparent',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Checkbox, {
    checked: done
  }), series != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: '8px',
      height: '8px',
      flexShrink: 0,
      borderRadius: 'var(--radius-round)',
      background: __ds_scope.seriesColor(series)
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      fontSize: 'var(--text-body)',
      /* 22px, not the inherited 21px: an even line box centres the 16px
         checkbox and the 14px due tag on whole pixels. An odd one puts
         both on a half pixel and softens the row. */
      lineHeight: '22px',
      color: done ? 'var(--paper-700)' : 'var(--paper-900)',
      textDecoration: done ? 'line-through' : 'none',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title), due ? /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-light)',
      fontSize: 'var(--text-nano)',
      lineHeight: '14px',
      letterSpacing: 'var(--tracking-label-sm)',
      textTransform: 'uppercase',
      color: done ? 'var(--paper-600)' : 'var(--paper-800)',
      border: '1px solid var(--paper-300)',
      borderRadius: 'var(--radius-pill)',
      padding: '2px 7px'
    }
  }, due) : null);
}
Object.assign(__ds_scope, { TaskRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/TaskRow.jsx", error: String((e && e.message) || e) }); }

// components/forms/DropdownMenu.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The widget picker. A solid white sheet that reads as a layer above the
   workspace rather than part of it: pill trigger, 16px sheet, 10px items, so
   it sits in the same shape language as the pill buttons and 24px cards.
   Trigger stays inline; the sheet is absolutely positioned beneath it. */
function DropdownMenu({
  trigger,
  label,
  open,
  onToggle,
  width = 248,
  align = 'right',
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      flexShrink: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    onClick: onToggle,
    style: {
      height: '32px',
      padding: '0 12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-body)',
      fontWeight: 'var(--weight-medium)',
      background: open ? 'var(--tenant-tint, var(--accent-tint))' : 'var(--surface-solid)',
      border: '1px solid ' + (open ? 'var(--tenant-accent, var(--accent))' : 'var(--paper-400)'),
      color: 'var(--paper-900)',
      userSelect: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", null, trigger), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-light)',
      fontSize: 'var(--text-caption)'
    }
  }, '\u25BE')), open ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '38px',
      [align]: 0,
      zIndex: 30,
      width: width + 'px',
      background: 'var(--surface-solid)',
      border: '1px solid var(--paper-500)',
      borderRadius: 'var(--radius-app-tile)',
      boxShadow: 'var(--shadow-menu)',
      padding: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '2px'
    }
  }, label ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-light)',
      fontSize: 'var(--text-caption)',
      color: 'var(--muted)',
      letterSpacing: 'var(--tracking-label)',
      padding: '6px 8px 8px',
      textTransform: 'uppercase'
    }
  }, label) : null, children) : null);
}
function DropdownMenuItem({
  children,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px',
      borderRadius: 'var(--radius-lg)',
      cursor: 'pointer',
      background: hover ? 'var(--paper-100)' : 'transparent',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { DropdownMenu, DropdownMenuItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/DropdownMenu.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Labelled input. shape="field" is the sign-in form treatment (38px, 4px
   radius, inset paper fill, mono uppercase label above); shape="pill" matches
   the in-workspace controls. */
function TextField({
  label,
  placeholder = '',
  value,
  onChange,
  type = 'text',
  shape = 'field',
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const pill = shape === 'pill';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-light)',
      fontSize: 'var(--text-caption)',
      color: 'var(--muted)',
      letterSpacing: 'var(--tracking-label-xs)',
      textTransform: 'uppercase'
    }
  }, label) : null, /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    value: value,
    placeholder: placeholder,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      height: pill ? '36px' : '38px',
      padding: pill ? '0 14px' : '0 12px',
      border: '1px solid ' + (focus ? 'var(--ink)' : pill ? 'var(--border-hairline)' : 'var(--paper-400)'),
      borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius-field)',
      background: pill ? 'var(--surface-solid)' : 'var(--surface-inset)',
      font: 'var(--type-body)',
      color: 'var(--ink)',
      outline: 'none',
      transition: 'border-color var(--dur-base) var(--ease-standard)'
    }
  }, rest)));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The eight modules, so a rail row is never a placeholder square. Keyed on
   the label so the common case needs no icon prop; pass `icon` to override. */
const MODULE_ICONS = {
  'personal hub': 'layout-dashboard',
  marketing: 'megaphone',
  finance: 'wallet',
  operations: 'package',
  'ai tasks': 'bot',
  sales: 'trending-up',
  'internal comms': 'message-square',
  'project mgt': 'list-checks',
  integrations: 'plug'
};
function defaultIcon(children) {
  const key = typeof children === 'string' ? children.trim().toLowerCase() : '';
  return MODULE_ICONS[key] || 'circle';
}

/* Rail nav row. Active is a solid ink pill with white text; inactive darkens
   its hover tint rather than its label. A count sits right in an accent pill —
   omit the prop and no pill renders.
   Hover is --rail-hover (neutral black at 10%), not a muted grey: grey
   disappears against a saturated rail. */
function NavItem({
  children,
  icon,
  active = false,
  count,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      color: active ? 'var(--text-on-ink)' : 'var(--ink)',
      height: '34px',
      borderRadius: 'var(--radius-pill)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '0 12px',
      cursor: 'pointer',
      overflow: 'hidden',
      background: !active && hover ? 'var(--rail-hover)' : 'transparent',
      transition: 'var(--transition-nav)',
      ...style
    }
  }, rest), active ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--rail-active)',
      borderRadius: 'var(--radius-pill)'
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 'var(--glyph)',
      height: 'var(--glyph)',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, icon || /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: defaultIcon(children),
    size: 14
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-body)',
      fontWeight: active ? 'var(--weight-medium)' : 'var(--weight-regular)'
    }
  }, children), count != null ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      marginLeft: 'auto',
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-light)',
      fontSize: 'var(--text-caption)',
      color: 'var(--text-on-accent)',
      background: 'var(--tenant-accent, var(--accent))',
      borderRadius: 'var(--radius-pill)',
      padding: '1px 6px'
    }
  }, count) : null);
}
Object.assign(__ds_scope, { NavItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavItem.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SearchField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* 36px solid-white pill in the top bar. The magnifier is a hairline circle,
   not a filled icon. */
function SearchField({
  placeholder = 'Search this workspace',
  value,
  onChange,
  maxWidth = 360,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      flex: 1,
      maxWidth: maxWidth + 'px',
      height: '36px',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-solid)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '0 10px',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '13px',
      height: '13px',
      border: '1.5px solid var(--muted)',
      borderRadius: '50%',
      flexShrink: 0
    }
  }), onChange ? /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    style: {
      flex: 1,
      minWidth: 0,
      border: 0,
      outline: 'none',
      background: 'transparent',
      font: 'var(--type-body)',
      color: 'var(--ink)'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-body)',
      color: 'var(--muted)'
    }
  }, placeholder));
}
Object.assign(__ds_scope, { SearchField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SearchField.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SegmentedControl.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Pill row for switching a view or a direction — not navigation, and not
   tabs on a page. 26px tall, active is a solid ink pill with a white label,
   inactive is muted and darkens on hover. */
function SegmentedControl({
  options = [],
  value,
  onChange,
  style,
  ...rest
}) {
  const items = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '2px',
      padding: '3px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-solid)',
      border: '1px solid var(--muted-20)',
      ...style
    }
  }, rest), items.map(o => {
    const on = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      type: "button",
      onClick: () => onChange && onChange(o.value),
      style: {
        height: '26px',
        padding: '0 11px',
        border: 0,
        borderRadius: 'var(--radius-pill)',
        background: on ? 'var(--ink)' : 'transparent',
        color: on ? 'var(--text-on-ink)' : 'var(--muted)',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-caption)',
        fontWeight: 'var(--weight-medium)',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        transition: 'background-color 160ms ease'
      }
    }, o.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SideRail.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* 216px rail. It is the SATURATED plane: a 10% ink tint over the ambient SVG
   so the blob comes through at full strength, while the main panel beside it
   reads the same blob through a warm-white veil. Two planes, one glow —
   never give both the same fill.
   Rail text is --ink for rows and --paper-700 for eyebrows. --muted vanishes
   into the blob here and must never be used on this plane.
   No backdrop blur: the ambient SVG is already Gaussian-blurred, so the 10%
   ink tint alone reads as saturated glass. Structure: a non-scrolling outer
   plane carries the fill, an inner column does the scrolling. */
function SideRail({
  tenantLogo,
  tenantLogoDark = false,
  label = 'FEATURES',
  brand,
  footerLabel,
  footerRows,
  footer,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-as-rail": "",
    style: {
      position: 'relative',
      width: 'var(--rail-width)',
      flexShrink: 0,
      borderRight: '1px solid var(--muted-20)',
      background: 'var(--surface-rail)',
      display: 'flex',
      minHeight: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      minHeight: 0,
      overflowY: 'auto',
      padding: '16px 8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    }
  }, brand ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 10px 14px',
      marginBottom: '2px',
      borderBottom: '1px solid var(--rail-divider)',
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'center',
      gap: '7px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '18px',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--ink)'
    }
  }, brand.name), brand.qualifier ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-light)',
      fontSize: '10px',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--muted)'
    }
  }, brand.qualifier) : null) : null, tenantLogo ? /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 'calc(var(--rail-lockup-h) + 28px)',
      padding: '0 10px 14px',
      marginBottom: '2px',
      borderBottom: '1px solid var(--rail-divider)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: 'var(--rail-lockup-h)',
      backgroundImage: 'url(' + tenantLogo + ')',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left center',
      backgroundOrigin: 'content-box',
      padding: tenantLogoDark ? '7px 10px' : 0,
      borderRadius: tenantLogoDark ? 'var(--radius-field)' : 0,
      backgroundColor: tenantLogoDark ? 'var(--paper-900)' : 'transparent'
    }
  })) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-caption)',
      color: 'var(--rail-label)',
      letterSpacing: 'var(--tracking-label)',
      padding: '12px 10px 8px'
    }
  }, label), children, footerLabel || footerRows || footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      padding: '14px 10px 0',
      borderTop: '1px solid var(--rail-divider)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }
  }, footerLabel ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-light)',
      fontSize: 'var(--text-caption)',
      letterSpacing: 'var(--tracking-label-sm)',
      textTransform: 'uppercase',
      color: 'var(--rail-label)'
    }
  }, footerLabel) : null, (footerRows || []).map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '8px',
      height: '8px',
      flexShrink: 0,
      borderRadius: 'var(--radius-round)',
      background: r.color || 'var(--series-' + (i % 8 + 1) + ')'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-caption)',
      color: 'var(--ink)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, r.label))), footer) : null));
}
Object.assign(__ds_scope, { SideRail });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SideRail.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* 56px glass bar across the top of every workspace view. The OS lockup sits
   flush left in the rail column, search is centred and capped at 360px, and
   account actions collect on the right.
   Opaque white, no backdrop blur — blur is reserved for surfaces over
   live video; type and the lockup keep subpixel antialiasing.
   The logo column shares --rail-width with SideRail, so it carries
   data-as-topbar-logo: target that, never the token, or rail CSS hits the
   bar too (SideRail is data-as-rail). */
function TopBar({
  logo,
  onLogoClick,
  children,
  actions,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      height: 'var(--topbar-height)',
      borderBottom: '1px solid var(--border-hairline)',
      background: 'var(--surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      flexShrink: 0,
      gap: '20px',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }
  }, logo ? /*#__PURE__*/React.createElement("div", {
    "data-as-topbar-logo": "",
    style: {
      width: 'var(--rail-width)',
      marginLeft: '-20px',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      padding: '0 0 0 18px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "autosolutions|OS",
    onClick: onLogoClick,
    title: onLogoClick ? 'Switch company' : undefined,
    style: {
      width: '100%',
      height: 'auto',
      maxHeight: '30px',
      objectFit: 'contain',
      objectPosition: 'left center',
      display: 'block',
      cursor: onLogoClick ? 'pointer' : 'default',
      transition: 'opacity var(--dur-fast) var(--ease-standard)'
    }
  })) : null), children, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }
  }, actions));
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopBar.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/AmbientBackground.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The signature element: a fixed full-viewport SVG holding one enormous
   organic accent blob under a 250px gaussian blur, sweeping up from the
   bottom of the page. Keep it in any re-skin — flat grey pages read as a
   different product.
   Pass base="transparent" to float the blob over a gradient the shell owns
   (--tenant-ambient), instead of the blob's own flat canvas fill. */
function AmbientBackground({
  color = 'var(--tenant-blob, var(--accent))',
  base = 'var(--canvas)',
  style,
  ...rest
}) {
  const id = React.useMemo(() => 'as-glow-' + Math.random().toString(36).slice(2, 8), []);
  const transparent = base === 'transparent' || base === 'none';
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 1280 832",
    preserveAspectRatio: "xMidYMid slice",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      position: 'fixed',
      inset: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
      ...style
    }
  }, rest), transparent ? null : /*#__PURE__*/React.createElement("rect", {
    width: "1280",
    height: "832",
    fill: base
  }), /*#__PURE__*/React.createElement("g", {
    filter: 'url(#' + id + ')',
    transform: "translate(0,832) scale(1.05) translate(0,-832) translate(-320,60)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M92 742C-10 660 40 486 214 470c118-11 168 54 300 40 150-16 214-118 356-96 158 24 236 156 300 268 52 92 44 208-64 244-150 50-372 34-560 12-166-20-380-98-454-196Z",
    fill: color
  })), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("filter", {
    id: id,
    x: "-620",
    y: "-140",
    width: "2520",
    height: "1620",
    filterUnits: "userSpaceOnUse",
    colorInterpolationFilters: "sRGB"
  }, /*#__PURE__*/React.createElement("feFlood", {
    floodOpacity: "0",
    result: "BackgroundImageFix"
  }), /*#__PURE__*/React.createElement("feBlend", {
    mode: "normal",
    in: "SourceGraphic",
    in2: "BackgroundImageFix",
    result: "shape"
  }), /*#__PURE__*/React.createElement("feGaussianBlur", {
    stdDeviation: "250",
    result: "effect1_foregroundBlur"
  }))));
}
Object.assign(__ds_scope, { AmbientBackground });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/AmbientBackground.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/AppTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const svgCache = {};

/* App launcher tile. 264x122, a brighter gradient glass than the card layer,
   with a soft accent disc bleeding off the top-right corner and the app's own
   wordmark filling the plate. Lifts 4px on hover.
   SVG wordmarks are fetched and inlined rather than set as an <img> src —
   an SVG loaded through <img> renders in restricted mode and cannot pull in
   the Google Sans webface the wordmarks are set in.
   Opaque near-white gradient, no backdrop blur — the wordmark keeps subpixel
   antialiasing; blur is reserved for surfaces over live video. */
function AppTile({
  logo,
  alt = '',
  href,
  onClick,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const isSvg = typeof logo === 'string' && logo.endsWith('.svg');
  const [svg, setSvg] = React.useState(() => isSvg ? svgCache[logo] || null : null);
  React.useEffect(() => {
    if (!isSvg) return undefined;
    let live = true;
    if (svgCache[logo]) {
      setSvg(svgCache[logo]);
      return undefined;
    }
    fetch(logo).then(r => r.ok ? r.text() : Promise.reject(r.status)).then(t => {
      const cleaned = t.replace(/<svg /, '<svg style="width:100%;height:auto;display:block" ');
      svgCache[logo] = cleaned;
      if (live) setSvg(cleaned);
    }).catch(() => {});
    return () => {
      live = false;
    };
  }, [logo, isSvg]);
  const inner = /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      minHeight: 'var(--tile-h)',
      background: hover ? 'linear-gradient(165deg, #FFFFFF 0%, #FDFDFC 100%)' : 'linear-gradient(165deg, #FEFEFE 0%, #FAF9F7 100%)',
      border: '1px solid ' + (hover ? 'var(--tenant-border, var(--muted-25))' : 'rgba(255,255,255,0.95)'),
      borderRadius: 'var(--radius-app-tile)',
      padding: '18px 22px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      cursor: 'pointer',
      boxShadow: hover ? 'var(--shadow-tile-glow-hover)' : 'var(--shadow-tile-glow)',
      transform: hover ? 'var(--motion-hover-lift)' : 'none',
      transition: 'var(--transition-tile)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '-46px',
      right: '-40px',
      width: '126px',
      height: '126px',
      borderRadius: '50%',
      background: 'var(--tenant-tint, var(--accent-tint))',
      opacity: 0.85,
      pointerEvents: 'none'
    }
  }), logo ? isSvg ? /*#__PURE__*/React.createElement("div", {
    role: "img",
    "aria-label": alt,
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: '214px'
    },
    dangerouslySetInnerHTML: {
      __html: svg || ''
    }
  }) : /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: alt,
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: '214px',
      height: 'auto',
      display: 'block'
    }
  }) : children);
  return href ? /*#__PURE__*/React.createElement("a", {
    href: href,
    target: "_blank",
    rel: "noopener",
    style: {
      textDecoration: 'none',
      display: 'block',
      height: '100%'
    }
  }, inner) : inner;
}
Object.assign(__ds_scope, { AppTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/AppTile.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/BusinessCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The entry-screen tenant card. Glass over the video hero, 20px radius,
   sized to a fixed height so the six businesses read as one grid. The default
   treatment is logo-only: the mark fills the plate and the name is implied.
   Pass showDetails for the fuller variant with initials, meta and mix bars.
   The blur is a layer behind the card's content, not on the card — an element
   carrying backdrop-filter composites its subtree, softening the tenant mark
   and every label on it. */
function BusinessCard({
  name,
  meta,
  status,
  logo,
  logoScale = 1,
  logoOnly = true,
  initials,
  weights = [3, 2, 1],
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const shades = ['rgba(255,255,255,0.75)', 'rgba(255,255,255,0.45)', 'rgba(255,255,255,0.22)'];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      isolation: 'isolate',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '16px',
      textAlign: 'left',
      padding: '22px',
      height: 'clamp(180px,26vh,240px)',
      borderRadius: 'var(--radius-business-card)',
      cursor: 'pointer',
      background: hover ? 'var(--glass-fill-hover)' : 'var(--glass-fill)',
      border: '1px solid ' + (hover ? 'var(--glass-edge-hover)' : 'var(--glass-edge)'),
      boxShadow: 'var(--shadow-business)',
      transform: hover ? 'var(--motion-hover-lift-sm)' : 'none',
      transition: 'var(--transition-card)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      zIndex: -1,
      pointerEvents: 'none',
      backdropFilter: 'var(--blur-business)',
      WebkitBackdropFilter: 'var(--blur-business)'
    }
  }), logoOnly ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: '118px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: Math.round(104 * logoScale) + 'px',
      backgroundImage: 'url(' + logo + ')',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '13px',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '42px',
      height: '42px',
      flexShrink: 0,
      borderRadius: 'var(--radius-avatar-well)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255,255,255,0.2)',
      border: '1px solid rgba(255,255,255,0.32)',
      color: '#ffffff',
      fontFamily: 'var(--font-mono-alt)',
      fontSize: 'var(--text-body)',
      fontWeight: 'var(--weight-medium)'
    }
  }, /*#__PURE__*/React.createElement("span", null, initials), logo ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'url(' + logo + ')',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundColor: 'rgba(255,255,255,0.92)',
      backgroundOrigin: 'content-box',
      padding: '5px'
    }
  }) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '15px',
      fontWeight: 'var(--weight-medium)',
      color: '#ffffff',
      letterSpacing: 'var(--tracking-tight)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--on-dark-body)'
    }
  }, meta))), status ? /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      fontFamily: 'var(--font-mono-alt)',
      fontSize: 'var(--text-micro)',
      letterSpacing: 'var(--tracking-status)',
      textTransform: 'uppercase',
      color: status.toLowerCase() === 'active' ? 'var(--on-dark-strong)' : 'rgba(255,255,255,0.6)',
      border: '1px solid var(--on-dark-secondary)',
      borderRadius: 'var(--radius-pill)',
      padding: '3px 8px'
    }
  }, status) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '6px'
    }
  }, weights.map((w, i) => w ? /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: '6px',
      flex: w,
      background: shades[i],
      borderRadius: 'var(--radius-pill)'
    }
  }) : null))));
}
Object.assign(__ds_scope, { BusinessCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/BusinessCard.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/DarkPanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Ink-filled panel, same 24px radius as a glass card. Reserved for the one
   list per view that should feel like a control surface — the agent run
   queue. Text goes white, secondary text white/30, dividers white/5. */
function DarkPanel({
  title,
  meta,
  flush = true,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--surface-panel)',
      borderRadius: 'var(--radius-dark-panel)',
      boxShadow: 'var(--shadow-card)',
      color: 'var(--text-on-ink)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      ...style
    }
  }, rest), title || meta ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px',
      borderBottom: '1px solid var(--on-dark-divider)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '10px'
    }
  }, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-card-title)',
      color: 'var(--text-on-ink)'
    }
  }, title) : /*#__PURE__*/React.createElement("span", null), meta ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-light)',
      fontSize: 'var(--text-caption)',
      color: 'var(--on-dark-secondary)',
      letterSpacing: 'var(--tracking-label-sm)'
    }
  }, meta) : null) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: flush ? 0 : 'var(--card-pad)',
      display: 'flex',
      flexDirection: 'column',
      gap: flush ? 0 : 'var(--space-35)'
    }
  }, children));
}

/* One row inside a DarkPanel. */
function DarkPanelRow({
  children,
  active = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--on-dark-divider)',
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      background: active ? 'var(--on-dark-tint)' : 'transparent',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { DarkPanel, DarkPanelRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/DarkPanel.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/GlassCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The workspace's default container. Frosted white over the ambient blob —
   no border, separation comes from blur, fill and shadow. flush removes the
   padding for cards whose rows run edge to edge (inbox, run queue).
   A card holding a long list should own its own scroll (`scroll`) rather
   than growing the page — the shell is viewport-locked and only the main
   panel scrolls.
   OPAQUE white, no backdrop blur: the ambient SVG behind it is already
   Gaussian-blurred, so the card reads as glass while its type keeps
   subpixel antialiasing. backdrop-filter is reserved for surfaces over
   live video (BusinessCard, Modal).
   `glow` swaps the directional shadow for the even halo — the directional one
   reads as nothing on a tinted panel. `fill` makes the card take its grid
   cell's full height, so two widgets in a 2x2 row measure identically
   regardless of how long their lists are. */
function GlassCard({
  title,
  meta,
  flush = false,
  scroll = false,
  glow = false,
  fill = false,
  children,
  style,
  headerStyle,
  ...rest
}) {
  const header = title || meta ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '10px',
      padding: flush ? '14px 18px' : 0,
      borderBottom: flush ? '1px solid var(--border-inner)' : 'none',
      ...headerStyle
    }
  }, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-card-title)',
      color: 'var(--ink)'
    }
  }, title) : /*#__PURE__*/React.createElement("span", null), meta ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-light)',
      fontSize: 'var(--text-caption)',
      color: 'var(--muted)',
      letterSpacing: 'var(--tracking-label-sm)'
    }
  }, meta) : null) : null;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--surface)',
      borderRadius: 'var(--radius-glass-card)',
      boxShadow: glow ? 'var(--shadow-card-glow)' : 'var(--shadow-card)',
      padding: flush ? 0 : 'var(--card-pad)',
      display: 'flex',
      flexDirection: 'column',
      gap: flush ? 0 : 'var(--space-35)',
      minWidth: 0,
      minHeight: 0,
      height: fill ? '100%' : undefined,
      overflow: 'hidden',
      ...style
    }
  }, rest), header, scroll ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: flush ? 0 : 'var(--space-35)'
    }
  }, children) : children);
}
Object.assign(__ds_scope, { GlassCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/GlassCard.jsx", error: String((e && e.message) || e) }); }

// doc-page.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <doc-page> — paged-document shell for printable HTML.
 *
 * FIRST, decide how the document paginates — up front, before building:
 *
 * - FLOWING document (the default): write the whole document as one
 *   normal HTML flow inside <doc-page>; the browser's print engine
 *   splits it onto pages at export. Use for long-form documents with a
 *   single text flow: reports, memos, letters, essays.
 * - EXPLICIT pagination: a fixed set of pre-paginated pages, one
 *   <section class="page"> child per page. Use when the user asks for a
 *   specific page count, or the design implies one: a one-page resume, a
 *   two-sided flier, a poster, a certificate, a brochure — any richly
 *   laid-out document without a single text flow.
 * - If in doubt, ask the user as part of the build.
 *
 * PAGE SIZING — paper differs by country (letter vs A4), so the printed
 * sheet is not one fixed truth:
 * - FLOWING documents pin NO paper size: the print engine paginates
 *   onto the user's real paper, and the content reflows to it.
 * - EXPLICITLY PAGINATED documents print each page at a FIXED page box
 *   with overflow hidden — letter by default, size="a4" for a clearly
 *   metric user, the user's chosen paper when they export. Design each
 *   page to FILL that box, fitting letter and A4 alike without overlap.
 * - width/height pin an explicit fixed size, ONLY when the user gives
 *   one.
 * Never write your own @page rule or hard-code paper dimensions in the
 * content.
 *
 * Sizing modes (attributes):
 *   (none)                      — portrait: flowing docs use the user's
 *           paper; explicitly paginated pages use the named size box
 *           (letter unless size="a4")
 *   orientation="landscape"     — the same, landscape
 *   width / height              — explicit fixed size, ONLY when the user
 *           gives one (e.g. width="22in" height="30in" for a 22×30
 *           poster): the page IS the design's size, printed at true
 *           dimensions (or scaled onto the user's paper at print time).
 *           Any absolute CSS length: px/in/mm/cm/pt/pc.
 * The component announces the chosen mode to the host app at runtime (a
 * meta tag it injects), so the print path can inject the user's true
 * paper size.
 *
 * On screen the document renders on a desk background: a flowing
 * document as one tall scrolling sheet (Google Docs' pageless view);
 * explicitly paginated documents as one card per page.
 *
 * EXPLICIT pagination usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page>
 *     <section class="page" id="p1">…one page's design…</section>
 *     <section class="page" id="p2">…</section>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * How the page box works, concretely: each .page prints as ONE full-bleed
 * sheet at a FIXED physical size — letter by default (set size="a4" for
 * a clearly metric user), the user's chosen paper when they export —
 * with overflow hidden. Nothing scrolls and nothing reflows onto a next
 * sheet: content that misses the box is CLIPPED. Design each page to
 * FILL that page box, and to fit it — letter and A4 alike — without
 * overlap. Each page is a size container; don't size anything in
 * viewport units (they track the window, not the page), and never set
 * width or height on the .page section itself (the component sizes the
 * page box; an authored height like 100% is meaningless at print and is
 * overridden). The component owns the page box, the screen card chrome,
 * and the page breaks (never add your own break-before/after). Don't mix
 * .page sections with flowing content or header/footer slots in the same
 * document.
 *
 * FLOWING usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page margin="0.75in">
 *     <h1>Title</h1>
 *     <p>…body…</p>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * There is no manual page-splitting — the browser's print engine
 * paginates at export. Standard break-hygiene rules (`break-inside:
 * avoid` on figures, code blocks, images and table rows; `orphans/
 * widows: 3`) are applied so paragraphs and groups split cleanly. On
 * screen and at print, headings default to `text-wrap: balance` and
 * body text to `text-wrap: pretty`; the defaults have zero specificity,
 * so any text-wrap you declare wins.
 *
 * Other attributes:
 *   size    — letter | a4 | legal (default letter). Flowing documents:
 *           preview proportion only — it does NOT pin their printed
 *           paper (the print dialog's paper governs); leave it alone
 *           there. Explicitly paginated documents: it sets the page box
 *           the cards and the pinned @page share (the export dialog's
 *           choice overrides both at print) — set size="a4" for a
 *           clearly metric user. Scaled-fit: names the sheet the fit is
 *           computed against, same a4-for-metric-users advice.
 *   content-width / content-height — the design's own fixed dimensions
 *           (CSS lengths), for scaling a fixed-size design ONTO the
 *           named sheet: content lays out at exactly this size, and the
 *           component scales it to fit that sheet's printable area
 *           (centered horizontally, top-aligned; the export dialog
 *           re-fits to the user's actual paper choice where available).
 *           Both must be set; they do not change the page box. For pages
 *           WITHOUT running header/footer slots.
 *   margin  — printable inset on every page of a FLOWING document
 *           (default 0.75in); margin="0" makes pages full-bleed.
 *           Explicitly paginated pages are always full-bleed.
 *
 * Running header/footer (flowing documents only): give an element
 * `slot="header"` or `slot="footer"` and it repeats on every printed
 * page via `position: fixed`. To keep body text from sliding under it,
 * the component prints inside a single-cell table whose <thead>/<tfoot>
 * are spacers sized to the header/footer height — browsers repeat
 * thead/tfoot on every page, so each sheet's content starts below the
 * header and ends above the footer. On screen the header/footer render
 * once at the top/bottom of the sheet.
 *
 * At print the component injects `@page { margin: 0 }` (which leaves
 * Chrome no margin box to draw its date/URL/page-count header in) and
 * moves the visual margin onto the sheet's own padding. It also marks
 * the document as owning its print CSS (a
 * `meta[name="omelette-owns-print"]` it injects at runtime), so the
 * PDF export never injects page-geometry CSS of its own on top.
 *
 * Print best practices for the content you author:
 * - Multi-column text: use CSS columns (`column-count` +
 *   `column-gap`), never side-by-side flex/grid columns — only real
 *   CSS columns flow and break across pages. `column-span: all` lets
 *   a heading span the columns; `hyphens: auto` (needs `lang` on
 *   the html element) keeps narrow columns readable.
 * - Page breaks in flowing documents: `break-before: page` on an
 *   element that must start a new page (a chapter, an appendix). Add
 *   your own kept-together blocks (callouts, stat tiles, cards) to a
 *   `break-inside: avoid` rule, and keep each one shorter than a page.
 * - Extend `orphans: 3; widows: 3` to any custom text blocks you add
 *   (p and li are covered by default).
 * - Give long tables a <thead> — browsers repeat it on every printed
 *   page.
 * - No `position: fixed`/`sticky` and no viewport units in content:
 *   fixed elements stamp every printed page (running headers/footers go
 *   in the component's slots) and `100vh` mis-sizes at print.
 *
 * Author content as static HTML so the user can click-to-edit any text
 * directly. Do not set width/padding/background on the document body —
 * the component owns the sheet box.
 */
/* END USAGE */

(() => {
  const PAPER = {
    letter: ['8.5in', '11in'],
    a4: ['210mm', '297mm'],
    legal: ['8.5in', '14in']
  };
  const CSS_LENGTH = /^\d+(\.\d+)?(px|in|mm|cm|pt|pc)$/;
  // Unitless "0" is a valid CSS length and the natural way to write
  // margin="0"; normalise it to 0px so max()/calc() (which reject a bare
  // number) keep working.
  const safeLen = (v, fb) => {
    v = (v || '').trim();
    return v === '0' ? '0px' : CSS_LENGTH.test(v) ? v : fb;
  };
  // WebKit (Safari and every iOS browser shell) never repeats a table's
  // thead/tfoot on printed pages (WebKit bug 17205), so the spacer-borne
  // vertical margins of a FLOWING document reach only the first page
  // there. Engine check, not browser check: vendor is 'Apple Computer,
  // Inc.' exactly for WebKit and 'Google Inc.' for Blink.
  const WK_PRINT = /apple/i.test(navigator.vendor || '');
  // CSS length → px number (CSS absolute units are exact: 1in = 96px).
  // Returns NaN for anything safeLen would reject — callers gate on it.
  const PX_PER = {
    px: 1,
    in: 96,
    mm: 96 / 25.4,
    cm: 96 / 2.54,
    pt: 96 / 72,
    pc: 16
  };
  const toPx = v => {
    const m = /^(\d+(?:\.\d+)?)(px|in|mm|cm|pt|pc)$/.exec((v || '').trim());
    return m ? parseFloat(m[1]) * PX_PER[m[2]] : NaN;
  };
  const stylesheet = `
    :host {
      position: relative;
      display: block;
      /* When the viewport is narrower than the page, grow to wrap the
       * sheet (plus this padding) instead of staying viewport-width, so
       * the desk background and right margin reach the sheet's far edge
       * in the horizontal scroll. */
      min-width: max-content;
      min-height: 100vh;
      background: #f5f5f4;
      padding: 48px 24px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
      --doc-page-w: 8.5in;
      --doc-page-h: 11in;
      --doc-page-margin: 0.75in;
      --doc-hdr-h: 0px;
      --doc-ftr-h: 0px;
      --doc-hdr-pad: 0px;
      --doc-ftr-pad: 0px;
    }
    .sheet {
      width: var(--doc-page-w);
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 2px 10px rgba(20, 20, 19, 0.12);
      border-radius: 7px;
      box-sizing: border-box;
      padding: var(--doc-page-margin);
    }
    .frame { width: 100%; border-collapse: collapse; }
    /* Scaled-fit mode (content-width/content-height): the inner .fit box
     * lays the content out at its authored fixed size and scales it onto
     * the printable area; .fit-box reserves the scaled footprint in flow
     * (transforms don't affect layout) and centers it. Without the mode,
     * both divs are unstyled block pass-throughs. */
    /* Explicit pagination: direct .page children are the pages. The sheet
     * becomes a transparent stack and each page carries the card look on
     * screen; at print each page is exactly one full-bleed sheet. The
     * ::slotted defaults are deliberately weak (document CSS wins), so
     * authored page styling can override any of this. */
    .sheet.paginated {
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
    }
    .paginated ::slotted(.page) {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: var(--doc-page-ar);
      container-type: size;
      overflow: hidden;
      box-sizing: border-box;
      background: #fff;
      border-radius: 7px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
      break-inside: avoid;
    }
    .paginated ::slotted(.page:not(:first-child)) { margin-top: 1rem; }
    @media print {
      .sheet.paginated { padding: 0; }
      /* The flowing-document vertical inset lives on the repeating
       * thead/tfoot spacers, not the sheet padding — they must go too,
       * or each full-sheet .page is pushed ~margin down and spills onto
       * a second sheet. Paginated pages are full-bleed by definition
       * (content owns its insets). */
      .sheet.paginated .hdr-space,
      .sheet.paginated .ftr-space { height: 0; }
      .paginated ::slotted(.page) {
        border-radius: 0 !important;
        box-shadow: none !important;
        margin: 0 !important;
        /* Physical page-box sizing, no viewport units: Safari resolves
         * 100vh against the window, not the page box, so a vh-sized card
         * paginates wrong there. --doc-page-w/h are the named size by
         * default and are overridden to the user's chosen paper by the
         * export path, so every card is exactly one sheet either way.
         * Width + height (same source values as @page size) rather than
         * width + aspect-ratio: the ratio is a 6-decimal rounding of the
         * same division, and a few millionths of overflow would spill a
         * blank sheet after every page. The screen-only aspect-ratio
         * (preview proportions) must not leak into print. cqh typography
         * tracks the same box.
         *
         * Every declaration is !important: per CSS Scoping, unimportant
         * shadow ::slotted rules LOSE to the document context, so a page
         * section's authored inline style would silently beat this print
         * geometry. A model-authored height:100% did exactly that — the
         * percentage resolves as auto in the all-auto print ancestry, the
         * base rule's size containment turns auto into ZERO, and
         * overflow:hidden then paints nothing: a blank PDF with perfect
         * page boxes. At print the component's geometry is the design's
         * whole contract, so it must win over any authored sizing. */
        aspect-ratio: auto !important;
        width: var(--doc-page-w) !important;
        height: var(--doc-page-h) !important;
        overflow: hidden !important;
      }
      .paginated ::slotted(.page:not(:first-child)) {
        break-before: page !important;
        margin-top: 0 !important;
      }
    }
    .fit-mode .fit-box {
      width: calc(var(--doc-fit-w) * var(--doc-fit-scale));
      height: calc(var(--doc-fit-h) * var(--doc-fit-scale));
      margin: 0 auto;
      break-inside: avoid;
    }
    .fit-mode .fit {
      width: var(--doc-fit-w);
      height: var(--doc-fit-h);
      transform: scale(var(--doc-fit-scale));
      transform-origin: top left;
    }
    .frame td, .frame th { padding: 0; text-align: left; font-weight: inherit; }
    .hdr-space { height: var(--doc-hdr-h); }
    .ftr-space { height: var(--doc-ftr-h); }
    ::slotted([slot="header"]),
    ::slotted([slot="footer"]) { display: block; box-sizing: border-box; }
    @media print {
      :host { background: none; padding: 0; min-width: 0; min-height: 0; }
      .sheet {
        width: auto; margin: 0; box-shadow: none; border-radius: 0;
        padding: 0 var(--doc-page-margin);
      }
      /* The thead/tfoot spacers repeat on every page, so they carry the
       * vertical page margin (which the sheet's own padding cannot, since
       * that padding is consumed once on the first/last page). The running
       * header/footer are fixed inside that band. */
      /* The 0.35in is breathing room between a running header/footer and
       * the body; without one the spacer is exactly the page margin, so a
       * margin="0" full-bleed document gets truly full-bleed pages. */
      .hdr-space { height: max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))); }
      .ftr-space { height: max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))); }
      /* WebKit flowing documents: @page carries the vertical margin (see
       * _syncPrintPageRule), so the spacers keep only whatever a running
       * header/footer needs BEYOND it — page 1 would otherwise double its
       * top inset. Paginated sheets already zero their spacers above. */
      .sheet.wk-print:not(.paginated) .hdr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))) - var(--doc-page-margin))); }
      .sheet.wk-print:not(.paginated) .ftr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))) - var(--doc-page-margin))); }
      ::slotted([slot="header"]) {
        position: fixed; top: 0; left: 0; right: 0; margin: 0;
        padding: calc(var(--doc-page-margin) * 0.45) var(--doc-page-margin) 0;
      }
      ::slotted([slot="footer"]) {
        position: fixed; bottom: 0; left: 0; right: 0; margin: 0;
        padding: 0 var(--doc-page-margin) calc(var(--doc-page-margin) * 0.45);
      }
    }
  `;
  class DocPage extends HTMLElement {
    static get observedAttributes() {
      return ['size', 'width', 'height', 'margin', 'orientation', 'content-width', 'content-height'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._mo = typeof MutationObserver === 'function' ? new MutationObserver(() => this._scheduleMeasure()) : null;
    }

    /** The named paper's [w, h], swapped when orientation="landscape".
     *  Only the named size swaps — explicit width/height are exact values
     *  the author already oriented. */
    _paperSize() {
      const named = PAPER[(this.getAttribute('size') || '').toLowerCase()] || PAPER.letter;
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? [named[1], named[0]] : named;
    }
    get pageWidth() {
      return safeLen(this.getAttribute('width'), this._paperSize()[0]);
    }
    get pageHeight() {
      return safeLen(this.getAttribute('height'), this._paperSize()[1]);
    }
    get pageMargin() {
      return safeLen(this.getAttribute('margin'), '0.75in');
    }

    /** Scaled-fit mode's content box [w, h] as CSS lengths, or null when
     *  the mode is off (either attribute missing/invalid/zero — a partial
     *  declaration falls back to normal flow rather than guessing). */
    _contentFit() {
      const w = safeLen(this.getAttribute('content-width'), null);
      const h = safeLen(this.getAttribute('content-height'), null);
      if (!w || !h) return null;
      const wPx = toPx(w),
        hPx = toPx(h);
      return wPx > 0 && hPx > 0 ? [w, h, wPx, hPx] : null;
    }
    connectedCallback() {
      if (!this._sheet) this._render();
      this._syncSize();
      this._syncPrintPageRule();
      this._ensureTextWrapDefaults();
      this._ensureOwnsPrintMeta();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      if (this._mo) this._mo.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      this._onResize = () => this._scheduleMeasure();
      window.addEventListener('resize', this._onResize);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => this._scheduleMeasure());
      }
      this._scheduleMeasure();
    }
    disconnectedCallback() {
      window.removeEventListener('resize', this._onResize);
      if (this._mo) this._mo.disconnect();
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
      // Drop the head rules when the last doc-page leaves, so a deleted
      // document's @page geometry and text-wrap defaults can't apply to
      // whatever replaces it.
      const survivor = document.querySelector('doc-page');
      if (!survivor) {
        ['doc-page-print', 'doc-page-text-wrap', 'doc-page-owns-print', 'doc-page-fixed-size', 'doc-page-print-sizing'].forEach(id => {
          const tag = document.getElementById(id);
          if (tag) tag.remove();
        });
        // A live deck-stage deferred its own print-sizing meta to ours —
        // hand the page-global meta over so the deck isn't left unmarked.
        const deck = document.querySelector('deck-stage');
        if (deck && typeof deck._ensurePrintSizingMeta === 'function') {
          deck._ensurePrintSizingMeta();
        }
      } else {
        // A departed owner hands each page-global meta to whatever
        // doc-page remains (or it's removed).
        if (typeof survivor._syncFixedSizeMeta === 'function') {
          survivor._syncFixedSizeMeta();
        }
        if (typeof survivor._syncPrintSizingMeta === 'function') {
          survivor._syncPrintSizingMeta();
        }
      }
    }
    attributeChangedCallback() {
      if (!this._sheet) return;
      this._syncSize();
      this._syncPrintPageRule();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      this._scheduleMeasure();
    }
    _render() {
      this._root.innerHTML = `
        <style>${stylesheet}</style>
        <style id="vars"></style>
        <div class="sheet" data-screen-label="Document">
          <table class="frame" role="presentation">
            <thead><tr><th><div class="hdr-space"><slot name="header"></slot></div></th></tr></thead>
            <tbody><tr><td class="body"><div class="fit-box"><div class="fit"><slot></slot></div></div></td></tr></tbody>
            <tfoot><tr><td><div class="ftr-space"><slot name="footer"></slot></div></td></tr></tfoot>
          </table>
        </div>`;
      this._sheet = this._root.querySelector('.sheet');
      this._vars = this._root.getElementById('vars');
    }

    /** Runtime sizing lives in a shadow <style> :host rule, never on the
     *  light-DOM host element, so serialize-persist can't write it back. */
    _syncSize(hdrH, ftrH) {
      // Scaled-fit mode: content at its authored size, scaled onto the
      // printable area (page minus margins on both axes). The factor is a
      // plain number var so calc(length * number) stays valid; 4 decimals
      // keeps the shadow style stable across re-measures. Upscaling is
      // allowed — print transforms are vector, so text and CSS stay crisp
      // (raster images soften, which the catalog bullet warns about).
      const fit = this._contentFit();
      let fitVars = '';
      if (fit) {
        const marginPx = toPx(this.pageMargin) || 0;
        const availW = toPx(this.pageWidth) - 2 * marginPx;
        const availH = toPx(this.pageHeight) - 2 * marginPx;
        const scale = Math.min(availW / fit[2], availH / fit[3]);
        if (scale > 0 && Number.isFinite(scale)) {
          fitVars = '--doc-fit-w:' + fit[0] + ';' + '--doc-fit-h:' + fit[1] + ';' + '--doc-fit-scale:' + scale.toFixed(4) + ';';
        }
      }
      this._sheet.classList.toggle('fit-mode', !!fitVars);
      // Numeric w/h ratio for the paginated page cards' aspect-ratio —
      // aspect-ratio takes a number, not a length ratio, so compute it
      // here (CSS length division isn't portable). 6 decimals keeps the
      // shadow style stable across re-syncs.
      const arW = toPx(this.pageWidth);
      const arH = toPx(this.pageHeight);
      const ar = arW > 0 && arH > 0 ? (arW / arH).toFixed(6) : '0.772727';
      this._vars.textContent = ':host{' + fitVars + '--doc-page-ar:' + ar + ';' + '--doc-page-w:' + this.pageWidth + ';' + '--doc-page-h:' + this.pageHeight + ';' + '--doc-page-margin:' + this.pageMargin + ';' + '--doc-hdr-h:' + (hdrH || 0) + 'px;' + '--doc-ftr-h:' + (ftrH || 0) + 'px;' + '--doc-hdr-pad:' + (hdrH ? '0.35in' : '0px') + ';' + '--doc-ftr-pad:' + (ftrH ? '0.35in' : '0px') + '}';
    }

    /** @page is a no-op inside shadow DOM, so the rule lives in <head>.
     *  Re-appended on every sync so it stays last in source order — the
     *  @page cascade is source-order per descriptor, so this rule wins
     *  over any other @page rule in the document.
     *
     *  The @page SIZE is pinned where the page box IS part of the design:
     *  explicit-fixed-size mode (width + height authored), scaled-fit
     *  mode (the named sheet the fit targets), and explicit pagination
     *  (the named size the cards share — so card and sheet agree on
     *  every print path, and the export path's chosen paper overrides
     *  BOTH with one later rule). For FLOWING documents no paper size is
     *  emitted at all — the true size comes from the user's preference,
     *  injected by the export path or chosen in the print dialog — so a
     *  flowing document never fights the paper it lands on.
     *  margin: 0 is emitted in every mode: it leaves Chrome no margin box
     *  to draw its date/URL/page-count header in, and the visual margin
     *  lives on the sheet's own padding. */
    _syncPrintPageRule() {
      const id = 'doc-page-print';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
      }
      document.head.appendChild(tag);
      // Three print-geometry regimes:
      // - true-size: the page IS the design — pin its exact size.
      // - scaled-fit (content-width/height): the fit factor is computed
      //   against the NAMED paper's printable area, so that paper must
      //   stay pinned or the scaled content overflows a smaller sheet
      //   (the export path re-fits and re-pins at print time on top).
      // - default modes: no paper size — but landscape still needs the
      //   paper-agnostic 'size: landscape' keyword, because the size
      //   descriptor is what carries orientation; without it a landscape
      //   document prints portrait whenever nothing injects a size.
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      // Explicit pagination pins the page box to the SAME values that
      // size the cards (the named size by default, the export path's
      // chosen paper when its later rule overrides both) — card and
      // sheet agree on every print path, and a mismatched real paper
      // shrinks-to-fit in the dialog instead of clipping a Letter card
      // on A4. Declared before the paginated read below so both derive
      // from one check.
      const paginatedNow = this.querySelector(':scope > .page') !== null;
      const sizeDescriptor = this._trueSizePx() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : this._contentFit() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : paginatedNow ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : landscape ? 'size: landscape; ' : '';
      // WebKit never repeats the thead/tfoot spacers that carry a flowing
      // document's vertical page margins (see WK_PRINT above), so pages
      // after the first print edge-to-edge there. Carry the VERTICAL
      // margins on @page for WebKit instead, and the shadow print CSS
      // trims the first-page spacers by the same amount (.sheet.wk-print
      // rules). Horizontal inset stays on the sheet's own padding in
      // every engine. Blink keeps margin: 0 (a nonzero margin there
      // re-opens the box Chrome draws its header furniture in). One cost,
      // learned in testing: Safari's own date/URL headers are a USER
      // dialog setting ("Print headers and footers") that renders in the
      // margin area when room exists — margin: 0 only suppressed it by
      // leaving no room, and no CSS controls it. The export dialog's
      // Safari guide teaches turning the setting off for flowing
      // documents. Explicitly paginated and fixed-size documents keep
      // margin: 0 everywhere: their pages ARE the sheet.
      const wkFlowing = WK_PRINT && !paginatedNow && !this._trueSizePx() && !this._contentFit();
      const marginDescriptor = wkFlowing ? 'margin: ' + this.pageMargin + ' 0; ' : 'margin: 0; ';
      // Shadow-internal marker (never serialized), kept in lockstep with
      // the @page decision above: the print CSS trims the first-page
      // spacers ONLY while @page actually carries the margins — a
      // true-size or scaled-fit sheet keeps margin: 0 and must keep its
      // spacers too. Re-synced here so attribute changes and pagination
      // flips move both together.
      if (this._sheet) this._sheet.classList.toggle('wk-print', wkFlowing);
      tag.textContent = '@page { ' + sizeDescriptor + marginDescriptor + '} ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; height: auto !important; overflow: visible !important; } ' + 'h1,h2,h3,h4,h5,h6 { break-after: avoid; } ' + 'figure,pre,blockquote,img,svg,tr { break-inside: avoid; } ' + 'p,li { orphans: 3; widows: 3; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; ' + 'backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } ' + '*, *::before, *::after { animation-delay: -99s !important; animation-duration: .001s !important; ' + 'animation-iteration-count: 1 !important; animation-fill-mode: both !important; ' + 'animation-play-state: running !important; transition-duration: 0s !important; } }';
    }

    /** Typographic defaults for document text: balance headings, avoid
     *  widowed/orphaned words in body copy (browsers without text-wrap
     *  support drop the declarations). Zero-specificity via :where() so
     *  any text-wrap authored on those elements wins; document-level so the
     *  rules reach the slotted (light DOM) content — shadow styles can't.
     *  data-omelette-injected marks the tag for the host editor to strip
     *  at serialize, so it is never written back as authored source. */
    _ensureTextWrapDefaults() {
      if (document.getElementById('doc-page-text-wrap')) return;
      const tag = document.createElement('style');
      tag.id = 'doc-page-text-wrap';
      tag.setAttribute('data-omelette-injected', '');
      tag.textContent = ':where(h1,h2,h3,h4,h5,h6){text-wrap:balance}' + ':where(p,li,blockquote,figcaption){text-wrap:pretty}';
      document.head.appendChild(tag);
    }

    /** Declares that this document owns its print CSS. The instant-PDF
     *  export checks for the meta by NAME PRESENCE alone (content is
     *  ignored) and skips its automatic print-CSS injections, so the
     *  component's @page geometry is never overridden by a heuristic.
     *  data-omelette-injected keeps it out of serialized source. */
    _ensureOwnsPrintMeta() {
      if (document.getElementById('doc-page-owns-print')) return;
      const tag = document.createElement('meta');
      tag.id = 'doc-page-owns-print';
      tag.name = 'omelette-owns-print';
      tag.content = 'true';
      tag.setAttribute('data-omelette-injected', '');
      document.head.appendChild(tag);
    }

    /** This page's valid true-size page box (explicit width AND height)
     *  as [w, h] px ints, or null when the mode is off. */
    _trueSizePx() {
      if (!safeLen(this.getAttribute('width'), null) || !safeLen(this.getAttribute('height'), null)) return null;
      const w = Math.round(toPx(this.pageWidth));
      const h = Math.round(toPx(this.pageHeight));
      return w > 0 && h > 0 ? [w, h] : null;
    }

    /** True-size pages (explicit width AND height) also declare the page
     *  box as the preview size: the in-app preview reads
     *  meta[name="omelette-fixed-size"] (content "W,H" in px ints) and
     *  scales the sheet into view — without it an 18in poster previews at
     *  true size with scrollbars. Never overrides an author-set meta
     *  (only the component's own id is managed). The meta is page-global
     *  while doc-page instances are not, so every sync recomputes the
     *  page-wide owner — the first connected true-size doc-page — and a
     *  non-true-size sibling's sync can never delete the owner's meta.
     *  Removed when no true-size page remains (the owner's disconnect
     *  re-syncs via any survivor) or when an author-set meta exists. */
    _syncFixedSizeMeta() {
      const id = 'doc-page-fixed-size';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-fixed-size"]:not([data-omelette-injected])');
      // The page-wide owner, not this instance: an upgraded true-size page
      // anywhere in the document keeps the meta alive and sized.
      let box = null;
      for (const el of document.querySelectorAll('doc-page')) {
        box = typeof el._trueSizePx === 'function' ? el._trueSizePx() : null;
        if (box) break;
      }
      if (!box || authored) {
        if (own) own.remove();
        return;
      }
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-fixed-size';
      tag.content = box[0] + ',' + box[1];
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }

    /** This page's print-sizing mode: 'fixed' when an explicit width AND
     *  height are authored (the page is the design's own size), else the
     *  default paper in the authored orientation. */
    _printSizingMode() {
      if (this._trueSizePx()) return 'fixed';
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? 'default-landscape' : 'default-portrait';
    }

    /** Announces the print-sizing mode to the host app:
     *  meta[name="omelette-print-sizing"] with content 'default-portrait',
     *  'default-landscape', or 'fixed' (fixed pages also carry the
     *  omelette-fixed-size meta with the page box in px). The export path
     *  probes it to decide what true paper size to inject at print time —
     *  in the default modes the component emits no paper size of its own.
     *  Same page-global ownership rules as the fixed-size meta above:
     *  first connected doc-page owns it, an authored meta is never
     *  overridden, removed when no doc-page remains. */
    _syncPrintSizingMeta() {
      const id = 'doc-page-print-sizing';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-print-sizing"]:not([data-omelette-injected])');
      // A fixed page wins outright (mirroring the fixed-size loop above,
      // so the two metas can never contradict each other in a mixed
      // multi-page document); otherwise the first page's mode holds.
      let mode = null;
      for (const el of document.querySelectorAll('doc-page')) {
        if (typeof el._printSizingMode !== 'function') continue;
        const m = el._printSizingMode();
        if (m === 'fixed') {
          mode = m;
          break;
        }
        if (mode === null) mode = m;
      }
      if (!mode || authored) {
        if (own) own.remove();
        return;
      }
      // A deck-stage that connected first injected its own meta and
      // defers to any existing one — take it over, or the document ends
      // up with two conflicting injected metas (a doc-page page is the
      // document; the deck re-ensures its meta if every doc-page leaves).
      const deckMeta = document.getElementById('deck-stage-print-sizing');
      if (deckMeta) deckMeta.remove();
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-print-sizing';
      tag.content = mode;
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }
    _scheduleMeasure() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = null;
        this._measure();
      });
    }

    /** Slot heights feed the print spacers (--doc-hdr-h / --doc-ftr-h), so
     *  they re-measure on content mutation, resize, and font load. The
     *  same pass detects explicit pagination (direct .page children) and
     *  toggles the sheet between the flowing-document card and the
     *  page-per-card stack — content edits can add or remove pages at any
     *  time, so this tracks the same mutations the measurement does. */
    _measure() {
      const hdr = this.querySelector(':scope > [slot="header"]');
      const ftr = this.querySelector(':scope > [slot="footer"]');
      const wasPaginated = this._sheet.classList.contains('paginated');
      this._sheet.classList.toggle('paginated', this.querySelector(':scope > .page') !== null);
      // The WebKit @page margin is flowing-only, so a pagination flip
      // must re-emit the rule (content edits can add or remove .page
      // sections at any time).
      if (this._sheet.classList.contains('paginated') !== wasPaginated) {
        this._syncPrintPageRule();
      }
      this._syncSize(hdr ? hdr.offsetHeight : 0, ftr ? ftr.offsetHeight : 0);
    }
  }
  if (!customElements.get('doc-page')) {
    customElements.define('doc-page', DocPage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "doc-page.js", error: String((e && e.message) || e) }); }

// ui_kits/entry/BootScreen.jsx
try { (() => {
const LINES = ['booting sales engines', 'upscaling nodes', 'connecting interfolders for operations', 'turning marketing agents on', 'warming up finance cores', 'negotiating with the database', 'teaching agents to read email', 'deduplicating the pipeline', 'calibrating profit sensors', 'spinning up 12 tireless interns', 'compiling quarterly vibes'];
const CHIPS = ['SALES', 'OPS', 'FINANCE', 'MARKETING', 'AGENTS', 'DATA', 'SUPPORT', 'INVENTORY'];
const POS = [[0.155, 0.20], [0.845, 0.20], [0.135, 0.79], [0.865, 0.79], [0.50, 0.125], [0.50, 0.875], [0.085, 0.495], [0.915, 0.495]];

/* The boot screen. Black plate, magenta OS mark pulsing inside a halo, module
   chips wired around it, and one rotating status line. */
function BootScreen({
  accent = '#FE3CF6'
}) {
  const [line, setLine] = React.useState(0);
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setLine(l => (l + 1) % LINES.length);
        setVisible(true);
      }, 250);
    }, 2000);
    return () => clearInterval(id);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: '16 / 9',
      background: '#000',
      overflow: 'hidden'
    }
  }, CHIPS.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c,
    style: {
      position: 'absolute',
      left: POS[i][0] * 100 + '%',
      top: POS[i][1] * 100 + '%',
      transform: 'translate(-50%,-50%)',
      padding: '7px 14px',
      borderRadius: 6,
      border: '1px solid rgba(254,60,246,0.35)',
      background: 'rgba(254,60,246,0.06)',
      fontFamily: 'var(--font-mono-alt)',
      fontSize: 11,
      letterSpacing: '0.12em',
      color: 'rgba(255,255,255,0.72)',
      whiteSpace: 'nowrap'
    }
  }, c)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '32%',
      maxWidth: 520,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '100%',
      marginBottom: '5%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '200%',
      zIndex: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 9999,
      background: accent,
      boxShadow: '0 0 10px rgba(254,60,246,0.9)',
      animation: 'as-blink 1100ms ease-in-out infinite',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-boot)',
      fontSize: 14,
      color: 'rgba(255,255,255,0.8)',
      opacity: visible ? 1 : 0,
      transition: 'opacity 250ms ease'
    }
  }, LINES[line])), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '-8%',
      right: '-8%',
      top: '-70%',
      bottom: '-70%',
      zIndex: 0,
      borderRadius: '26% / 44%',
      background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.94) 42%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: '76%',
      aspectRatio: '2 / 1',
      borderRadius: 9999,
      background: 'radial-gradient(ellipse at center, rgba(254,60,246,0.32), rgba(254,60,246,0) 70%)',
      filter: 'blur(28px)',
      animation: 'as-halo 1600ms ease-in-out infinite'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/autosolutions-os-onDark-md.png",
    alt: "autosolutions|OS",
    style: {
      position: 'relative',
      width: '100%',
      height: 'auto',
      display: 'block',
      animation: 'as-pulse 1600ms ease-in-out infinite'
    }
  }))));
}
Object.assign(window, {
  BootScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/entry/BootScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/entry/EntryFlow.jsx
try { (() => {
const NSE = window.AutoSolutionsOSDesignSystem_884ce0;
const {
  LiquidGlassButton,
  BusinessCard,
  Modal,
  Loader,
  Icon: EIcon
} = NSE;
const BUSINESSES = [{
  id: 'frank',
  name: 'frank body',
  meta: '7 modules · 12 agents',
  status: 'Active',
  weights: [3, 2, 1],
  logo: '../../assets/tenants/frank.svg'
}, {
  id: 'snouts',
  name: 'senior snouts',
  meta: '5 modules · 3 agents',
  status: 'Active',
  weights: [2, 3, 1],
  logo: '../../assets/tenants/snouts.avif',
  logoScale: 1.32
}, {
  id: 'coreiq',
  name: 'coreiQ',
  meta: '6 modules · 8 agents',
  status: 'Active',
  weights: [4, 1, 2],
  logo: '../../assets/tenants/coreiq.avif',
  invert: true
}, {
  id: 'strength',
  name: 'strength lab',
  meta: '4 modules · 2 agents',
  status: 'Active',
  weights: [1, 2, 2],
  logo: '../../assets/tenants/strength.png',
  invert: true
}, {
  id: 'ledgify',
  name: 'ledgify',
  meta: '6 modules · 5 agents',
  status: 'Active',
  weights: [3, 1, 3],
  logo: '../../assets/tenants/ledgify.png'
}, {
  id: 'enxgy',
  name: 'enxgy',
  meta: '2 modules · 0 agents',
  status: 'Setup',
  weights: [1, 0, 5],
  logo: '../../assets/tenants/enxgy.png',
  invert: true
}];
const GoogleG = () => /*#__PURE__*/React.createElement("svg", {
  width: "17",
  height: "17",
  viewBox: "0 0 48 48",
  style: {
    display: 'block',
    flexShrink: 0
  }
}, /*#__PURE__*/React.createElement("path", {
  fill: "#FFC107",
  d: "M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"
}), /*#__PURE__*/React.createElement("path", {
  fill: "#FF3D00",
  d: "M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
}), /*#__PURE__*/React.createElement("path", {
  fill: "#4CAF50",
  d: "M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.6 5.1C9.6 39.6 16.2 44 24 44z"
}), /*#__PURE__*/React.createElement("path", {
  fill: "#1976D2",
  d: "M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C39.8 35.9 44 30.6 44 24c0-1.3-.1-2.6-.4-3.9z"
}));

/* Pre-auth shell: a rounded black plate holding a full-bleed looping video,
   a bottom-up protection scrim, and whichever step is showing. */
function EntryFlow({
  onEnter
}) {
  const [step, setStep] = React.useState('intro');
  const [chosen, setChosen] = React.useState(-1);
  const [signingIn, setSigningIn] = React.useState(false);
  const picked = BUSINESSES[chosen];
  const signIn = async () => {
    if (signingIn) return;
    setSigningIn(true);
    await new Promise(r => setTimeout(r, 1100));
    setSigningIn(false);
    if (onEnter) onEnter(picked ? picked.id : 'frank');
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      minHeight: '100vh',
      background: 'transparent',
      padding: 'clamp(12px,2vw,24px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 'clamp(16px,2vw,24px)',
      background: '#111111',
      minHeight: 'calc(100vh - 2 * clamp(12px,2vw,24px))',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      background: '#000'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(120% 100% at 20% 0%, #6a4a5e 0%, #2a1f28 45%, #0c0a0c 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(70% 60% at 78% 78%, rgba(254,60,246,0.22), transparent 70%)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'var(--scrim-video)',
      opacity: 0.25
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      padding: 'clamp(16px,2.2vw,32px)'
    }
  }, step === 'intro' ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 34,
      animation: 'as-rise 520ms cubic-bezier(0.22,1,0.36,1) both'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/autosolutions-os-onDark-md.png",
    alt: "autosolutions|OS",
    style: {
      width: 'min(440px,74vw)',
      height: 'auto',
      display: 'block',
      filter: 'var(--shadow-logo)'
    }
  }), /*#__PURE__*/React.createElement(LiquidGlassButton, {
    onClick: () => setStep('picker')
  }, /*#__PURE__*/React.createElement("span", null, "Let\u2019s start"), /*#__PURE__*/React.createElement(EIcon, {
    name: "arrow-right",
    size: 16,
    color: "#fff"
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 'clamp(20px,3vh,36px)',
      animation: 'as-fade 420ms ease both'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/autosolutions-os-onDark-md.png",
    alt: "autosolutions|OS",
    onClick: () => setStep('intro'),
    title: "Back to start",
    style: {
      width: 190,
      maxWidth: '44vw',
      height: 'auto',
      display: 'block',
      flexShrink: 0,
      alignSelf: 'flex-start',
      cursor: 'pointer'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 24,
      maxWidth: 1180,
      width: '100%',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/umg-group.png",
    alt: "UMG Group",
    style: {
      width: 'min(320px,58vw)',
      height: 'auto',
      display: 'block',
      filter: 'var(--shadow-logo-sm)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 52,
      padding: '0 clamp(24px,7vw,110px)'
    }
  }, BUSINESSES.map((b, i) => /*#__PURE__*/React.createElement(BusinessCard, {
    key: b.id,
    logo: b.logo,
    logoScale: b.logoScale,
    name: b.name,
    onClick: () => {
      setChosen(i);
      setStep('auth');
    },
    style: b.invert ? {
      filter: 'none'
    } : null
  }))))), step === 'auth' ? /*#__PURE__*/React.createElement(Modal, {
    tone: "glass",
    width: 400,
    onDismiss: () => {
      setChosen(-1);
      setStep('picker');
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(GoogleG, null), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-tight)'
    }
  }, "Sign in to continue"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--on-dark-body)'
    }
  }, "Use your Google account to open ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#fff',
      fontWeight: 'var(--weight-medium)'
    }
  }, picked ? picked.name : 'your portal'))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: signIn,
    disabled: signingIn,
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      background: '#ffffff',
      color: '#0a0a0a',
      fontSize: 14,
      fontWeight: 600,
      padding: '12px 16px',
      border: 0,
      borderRadius: 12,
      cursor: signingIn ? 'default' : 'pointer',
      opacity: signingIn ? 0.75 : 1,
      transition: 'background-color 150ms ease, opacity 150ms ease'
    }
  }, signingIn ? /*#__PURE__*/React.createElement(Loader, {
    src: "../../assets/loading.gif",
    label: "Signing in\u2026"
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GoogleG, null), /*#__PURE__*/React.createElement("span", null, "Continue with Google"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      lineHeight: 1.5,
      color: 'rgba(255,255,255,0.62)',
      textAlign: 'center'
    }
  }, "By continuing you agree to our ", /*#__PURE__*/React.createElement("a", {
    href: "#terms",
    style: {
      color: 'rgba(255,255,255,0.88)'
    }
  }, "Terms"), " and ", /*#__PURE__*/React.createElement("a", {
    href: "#privacy",
    style: {
      color: 'rgba(255,255,255,0.88)'
    }
  }, "Privacy Policy"), "."), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setChosen(-1);
      setStep('picker');
    },
    style: {
      background: 'transparent',
      border: 0,
      color: 'var(--on-dark-body)',
      fontSize: 14,
      cursor: 'pointer',
      padding: 0
    }
  }, "Choose a different business"))) : null)));
}
Object.assign(window, {
  EntryFlow,
  BUSINESSES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/entry/EntryFlow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/workspace/ModulesA.jsx
try { (() => {
const NS = window.AutoSolutionsOSDesignSystem_884ce0;
const {
  GlassCard,
  DarkPanel,
  DarkPanelRow,
  AppTile,
  Badge,
  Button,
  Skeleton,
  MonoLabel,
  Icon,
  Avatar,
  StatBlock,
  ProgressBar,
  BarChart,
  DataTable,
  IconButton
} = NS;
const A = '../../assets/apps/';
const sk = (w, tone) => React.createElement(Skeleton, {
  width: w,
  tone
});
const row3 = (a, b, c) => [sk(a, 'strong'), sk(), sk(c)];
function Head({
  crumb,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 20,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(MonoLabel, null, crumb), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-title)',
      letterSpacing: 'var(--tracking-display)'
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, children));
}
const APPS = [{
  logo: 'art-ificial-design-studio',
  alt: 'art-ificial design studio',
  href: 'https://frank-create.lovable.app'
}, {
  logo: 'shelf-simulator',
  alt: 'Shelf Simulator'
}, {
  logo: 'product-idea-validator',
  alt: 'Product/Idea Validator'
}, {
  logo: 'social-simulator',
  alt: 'Social Simulator'
}, {
  logo: 'franks-kitchen',
  alt: "frank's kitchen"
}, {
  logo: 'content-calendar',
  alt: 'Content Calendar'
}, {
  logo: 'ad-management',
  alt: 'Ad Management'
}];
function Marketing({
  crumb
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Head, {
    crumb: crumb + ' / MARKETING',
    title: "Marketing"
  }, /*#__PURE__*/React.createElement(Button, {
    tone: "secondary"
  }, "Filter"), /*#__PURE__*/React.createElement(Button, null, "New campaign")), /*#__PURE__*/React.createElement(MonoLabel, null, "APPS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,264px)',
      gridAutoRows: '122px',
      gap: 20,
      justifyContent: 'start'
    }
  }, APPS.map(a => /*#__PURE__*/React.createElement(AppTile, {
    key: a.logo,
    logo: A + a.logo + '.svg',
    alt: a.alt,
    href: a.href
  }))));
}
function Finance({
  crumb
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Head, {
    crumb: crumb + ' / FINANCE',
    title: "Finance"
  }, /*#__PURE__*/React.createElement(Button, {
    tone: "secondary"
  }, "FY26 \xB7 Jul"), /*#__PURE__*/React.createElement(Button, null, "Export")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
      gap: 14
    }
  }, [['trending-up', 'REVENUE', '70%'], ['percent', 'GROSS MARGIN', '55%'], ['wallet', 'CASH ON HAND', '64%'], ['flame', 'BURN', '48%']].map(s => /*#__PURE__*/React.createElement(GlassCard, {
    key: s[1]
  }, /*#__PURE__*/React.createElement(StatBlock, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: s[0],
      size: 13
    }),
    skeleton: true,
    skeletonWidth: s[2],
    label: s[1]
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
      gap: 14,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(GlassCard, {
    title: "P&L summary"
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: ['LINE', 'ACTUAL', 'BUDGET', 'VAR'],
    template: "2fr 1fr 1fr 1fr",
    rows: [row3('60%', 0, '60%'), row3('48%', 0, '70%'), row3('72%', 0, '44%'), row3('54%', 0, '62%')]
  })), /*#__PURE__*/React.createElement(GlassCard, {
    title: "Awaiting approval",
    meta: "3"
  }, [75, 60, 68].map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: 10,
      border: '1px solid var(--border-inner)',
      borderRadius: 'var(--radius-field)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26,
      height: 26,
      background: 'var(--paper-250)',
      borderRadius: 3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    tone: "strong",
    width: w + '%',
    height: 7
  }), /*#__PURE__*/React.createElement(Skeleton, {
    width: w - 30 + '%',
    height: 6
  })))))));
}
function Operations({
  crumb
}) {
  const status = hot => /*#__PURE__*/React.createElement("div", {
    style: {
      height: 18,
      border: '1px solid ' + (hot ? 'var(--tenant-border, var(--muted-25))' : 'var(--border-inner)'),
      background: hot ? 'var(--tenant-tint, var(--accent-tint))' : 'var(--paper-100)',
      borderRadius: 'var(--radius-pill)'
    }
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Head, {
    crumb: crumb + ' / OPERATIONS',
    title: "Operations"
  }, /*#__PURE__*/React.createElement(Button, {
    tone: "secondary"
  }, "All SKUs"), /*#__PURE__*/React.createElement(Button, null, "Raise PO")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
      gap: 14,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(GlassCard, {
    title: "Inventory & cover",
    meta: "142 SKUS"
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: ['SKU', 'ON HAND', 'COVER', 'STATUS'],
    template: "2fr 1fr 1fr 100px",
    rows: [[sk('70%', 'strong'), sk(), sk(), status(true)], [sk('55%', 'strong'), sk(), sk(), status()], [sk('64%', 'strong'), sk(), sk(), status()], [sk('48%', 'strong'), sk(), sk(), status(true)], [sk('76%', 'strong'), sk(), sk(), status()]]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(GlassCard, {
    title: "Demand signal"
  }, /*#__PURE__*/React.createElement(BarChart, {
    values: [38, 56, 44, 72, 61, 88, 52],
    accentIndex: 5,
    caption: "CHART PLACEHOLDER"
  })), /*#__PURE__*/React.createElement(GlassCard, {
    title: "PO queue"
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--paper-600)'
    }
  }), /*#__PURE__*/React.createElement(Skeleton, null)))))));
}
function AITasks({
  crumb
}) {
  const perm = (k, v, hot) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      flex: 1,
      minWidth: 180,
      border: '1px solid ' + (hot ? 'var(--muted-25)' : 'var(--paper-400)'),
      background: hot ? 'var(--tenant-tint, var(--accent-tint))' : 'var(--surface-solid)',
      borderRadius: 'var(--radius-paper-card)',
      padding: '12px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(MonoLabel, {
    track: "md",
    tone: hot ? 'ink' : 'muted'
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--muted)'
    }
  }, v));
  const queue = [['WRITE', true], ['DRAFT', false], ['READ', false], ['READ', false]];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Head, {
    crumb: crumb + ' / AI TASKS',
    title: "AI Tasks"
  }, /*#__PURE__*/React.createElement(Button, {
    tone: "secondary"
  }, "All agents"), /*#__PURE__*/React.createElement(Button, null, "Run task")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, perm('READ', 'Runs freely'), perm('DRAFT', 'Runs freely'), perm('WRITE', 'Human approval required', true)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
      gap: 14,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(DarkPanel, {
    title: "Run queue",
    meta: "4 AWAITING APPROVAL"
  }, queue.map((q, i) => /*#__PURE__*/React.createElement(DarkPanelRow, {
    key: i,
    active: q[1],
    style: i === queue.length - 1 ? {
      borderBottom: 'none'
    } : null
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: q[1] ? 'var(--tenant-accent, var(--accent))' : 'var(--on-dark-secondary)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    tone: "onDark",
    width: [62, 48, 70, 56][i] + '%'
  }), /*#__PURE__*/React.createElement(Skeleton, {
    tone: "onDarkWeak",
    height: 6,
    width: [36, 30, 42, 38][i] + '%'
  })), /*#__PURE__*/React.createElement(Badge, {
    tone: q[1] ? 'accent' : 'onDark'
  }, q[0])))), /*#__PURE__*/React.createElement(GlassCard, {
    title: "Approval detail"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    width: "90%"
  }), /*#__PURE__*/React.createElement(Skeleton, {
    width: "82%"
  }), /*#__PURE__*/React.createElement(Skeleton, {
    width: "64%"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px dashed var(--border-dashed)',
      borderRadius: 'var(--radius-field)',
      padding: 12,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(MonoLabel, {
    track: "md"
  }, "PROPOSED CHANGE"), /*#__PURE__*/React.createElement(Skeleton, {
    tone: "strong",
    width: "70%"
  }), /*#__PURE__*/React.createElement(Skeleton, {
    tone: "strong",
    width: "52%"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    block: true
  }, "Approve"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    tone: "secondary",
    block: true
  }, "Reject")))));
}
Object.assign(window, {
  Head,
  Marketing,
  Finance,
  Operations,
  AITasks,
  sk,
  row3
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/workspace/ModulesA.jsx", error: String((e && e.message) || e) }); }

// ui_kits/workspace/ModulesB.jsx
try { (() => {
const NS2 = window.AutoSolutionsOSDesignSystem_884ce0;
const {
  GlassCard: GC,
  Badge: Bg,
  Button: Bt,
  Skeleton: Sk,
  MonoLabel: ML,
  Avatar: Av,
  ProgressBar: PB,
  DataTable: DT
} = NS2;
const Hd = window.Head;
const s2 = (w, tone) => React.createElement(Sk, {
  width: w,
  tone
});
const STAGES = [{
  name: 'Lead',
  n: 14,
  cards: [78, 62, 70]
}, {
  name: 'Qualified',
  n: 9,
  cards: [66, 80]
}, {
  name: 'Proposal',
  n: 7,
  cards: [72, 58],
  stalled: true
}, {
  name: 'Negotiation',
  n: 5,
  cards: [74]
}, {
  name: 'Closed won',
  n: 3,
  cards: [64, 56],
  won: true
}];
function Sales({
  crumb
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hd, {
    crumb: crumb + ' / SALES',
    title: "Sales"
  }, /*#__PURE__*/React.createElement(Bt, {
    tone: "secondary"
  }, "This quarter"), /*#__PURE__*/React.createElement(Bt, null, "New deal")), /*#__PURE__*/React.createElement(GC, {
    title: "Pipeline",
    meta: "38 OPEN DEALS"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
      gap: 12,
      alignItems: 'start'
    }
  }, STAGES.map(st => /*#__PURE__*/React.createElement("div", {
    key: st.name,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 'var(--weight-medium)'
    }
  }, st.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-light)',
      fontSize: 12,
      color: 'var(--muted)'
    }
  }, st.n)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      background: st.won ? 'var(--tenant-accent, var(--accent))' : 'var(--tenant-bar, var(--ink))',
      borderRadius: 'var(--radius-pill)'
    }
  }), st.cards.map((w, i) => {
    const hot = st.stalled && i === 0;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        border: '1px solid ' + (hot ? 'var(--tenant-border, var(--muted-25))' : 'var(--border-inner)'),
        background: hot ? 'var(--tenant-tint, var(--accent-tint))' : 'transparent',
        borderRadius: 'var(--radius-field)',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 7
      }
    }, /*#__PURE__*/React.createElement(Sk, {
      tone: "strong",
      width: w + '%'
    }), hot ? /*#__PURE__*/React.createElement(ML, {
      track: "md",
      size: "var(--text-nano)"
    }, "STALLED 14D") : /*#__PURE__*/React.createElement(Sk, {
      height: 6,
      width: w - 25 + '%'
    }));
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
      gap: 14,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(GC, {
    title: "Deals",
    meta: "CLOSE DATE \u2191"
  }, /*#__PURE__*/React.createElement(DT, {
    columns: ['ACCOUNT', 'VALUE', 'OWNER'],
    template: "2fr 1fr 1fr",
    rows: [[s2('72%', 'strong'), s2(), s2('60%')], [s2('54%', 'strong'), s2(), s2('70%')], [s2('66%', 'strong'), s2(), s2('48%')], [s2('60%', 'strong'), s2(), s2('64%')]]
  })), /*#__PURE__*/React.createElement(GC, {
    title: "Forecast vs quota"
  }, /*#__PURE__*/React.createElement(PB, {
    label: "Committed",
    value: 62
  }), /*#__PURE__*/React.createElement(PB, {
    label: "Best case",
    value: 88,
    tone: "muted"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--border-inner)'
    }
  }), /*#__PURE__*/React.createElement(ML, {
    track: "md"
  }, "BY REP"), [0, 1, 2].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Av, {
    size: 24
  }), /*#__PURE__*/React.createElement(Sk, null))))));
}
function Comms({
  crumb
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hd, {
    crumb: crumb + ' / INTERNAL COMMS',
    title: "Internal Comms"
  }, /*#__PURE__*/React.createElement(Bt, null, "New post")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(200px,1fr) 3fr',
      gap: 14,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(GC, null, /*#__PURE__*/React.createElement(ML, {
    track: "md"
  }, "CHANNELS"), [true, false, false, false].map((on, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 8px',
      borderRadius: 'var(--radius-field)',
      background: on ? 'var(--paper-150)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-light)',
      fontSize: 12,
      color: 'var(--muted)'
    }
  }, "#"), /*#__PURE__*/React.createElement(Sk, {
    tone: on ? 'strong' : 'weak'
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(GC, {
    style: {
      flexDirection: 'row',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Av, {
    size: 32
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 64,
      border: '1px solid var(--border-inner)',
      borderRadius: 'var(--radius-field)',
      background: 'var(--surface-inset)'
    }
  })), /*#__PURE__*/React.createElement(GC, {
    style: {
      flexDirection: 'row',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Av, {
    size: 36
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Sk, {
    tone: "strong",
    width: "34%",
    height: 9
  }), /*#__PURE__*/React.createElement(Sk, {
    width: "92%"
  }), /*#__PURE__*/React.createElement(Sk, {
    width: "78%"
  }), /*#__PURE__*/React.createElement(Sk, {
    width: "50%"
  }))), /*#__PURE__*/React.createElement(GC, {
    style: {
      flexDirection: 'row',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Av, {
    size: 36
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Sk, {
    tone: "strong",
    width: "28%",
    height: 9
  }), /*#__PURE__*/React.createElement(Sk, {
    width: "86%"
  }), /*#__PURE__*/React.createElement(Sk, {
    width: "66%"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 70,
      border: '1px dashed var(--border-dashed)',
      borderRadius: 'var(--radius-field)',
      marginTop: 4
    }
  }))))));
}
function Projects({
  crumb
}) {
  const bars = [[1, 4], [3, 5], [6, 4], [8, 3]];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hd, {
    crumb: crumb + ' / PROJECT MGT',
    title: "Project Mgt"
  }, /*#__PURE__*/React.createElement(Bt, {
    tone: "secondary"
  }, "Timeline"), /*#__PURE__*/React.createElement(Bt, null, "New task")), /*#__PURE__*/React.createElement(GC, {
    title: "Delivery timeline"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '160px repeat(10,1fr)',
      gap: 6,
      alignItems: 'center'
    }
  }, bars.map((b, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement(Sk, {
    tone: "strong",
    width: [70, 56, 64, 44][i] + '%'
  }), b[0] > 1 ? /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: 'span ' + (b[0] - 1)
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: 'span ' + b[1],
      height: 20,
      background: i % 2 === 0 ? 'var(--tenant-bar, var(--ink))' : 'var(--paper-250)',
      borderRadius: 3
    }
  }), 11 - b[0] - b[1] > 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: 'span ' + (11 - b[0] - b[1])
    }
  }) : null)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))',
      gap: 14
    }
  }, [['Backlog', 8, 2], ['In progress', 3, 1], ['Review', 2, 2], ['Done', 21, 1]].map(c => /*#__PURE__*/React.createElement(GC, {
    key: c[0]
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 'var(--weight-medium)'
    }
  }, c[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-light)',
      fontSize: 12,
      color: 'var(--muted)'
    }
  }, c[1])), Array.from({
    length: c[2]
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 52,
      border: '1px solid var(--border-inner)',
      borderRadius: 'var(--radius-field)'
    }
  }))))));
}
function Integrations({
  crumb
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hd, {
    crumb: crumb + ' / INTEGRATIONS',
    title: "Integrations"
  }, /*#__PURE__*/React.createElement(Bt, null, "Connect source")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
      gap: 14
    }
  }, [[62, false], [54, false], [70, true], [58, false], [66, false]].map((s, i) => /*#__PURE__*/React.createElement(GC, {
    key: i,
    style: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      background: 'var(--tenant-tint, var(--accent-tint))',
      border: '1px solid var(--tenant-border, var(--muted-25))',
      borderRadius: 'var(--radius-field)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Sk, {
    tone: "strong",
    width: s[0] + '%'
  }), /*#__PURE__*/React.createElement(Sk, {
    height: 6,
    width: s[0] - 22 + '%'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: s[1] ? 'var(--tenant-accent, var(--accent))' : 'var(--paper-800)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px dashed var(--border-dashed)',
      borderRadius: 'var(--radius-paper-card)',
      padding: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      color: 'var(--muted)',
      fontSize: 14,
      minHeight: 68,
      cursor: 'pointer'
    }
  }, "+ Add source")), /*#__PURE__*/React.createElement(GC, {
    title: "Sync log",
    meta: "LAST 24H"
  }, ['04:12', '02:00', '23:45'].map(t => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-light)',
      fontSize: 12,
      color: 'var(--muted)',
      width: 76
    }
  }, t), /*#__PURE__*/React.createElement(Sk, {
    height: 7
  })))));
}
Object.assign(window, {
  Sales,
  Comms,
  Projects,
  Integrations
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/workspace/ModulesB.jsx", error: String((e && e.message) || e) }); }

// ui_kits/workspace/PersonalHub.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const NSH = window.AutoSolutionsOSDesignSystem_884ce0;
const {
  GlassCard: HC,
  Badge: HB,
  Button: HBt,
  MonoLabel: HML,
  Icon: HI,
  AnalogClock,
  ListRow,
  TaskRow,
  AgendaRow,
  DropdownMenu,
  DropdownMenuItem,
  Checkbox
} = NSH;
const ZONES = [{
  city: 'MELBOURNE',
  tz: 'Australia/Melbourne'
}, {
  city: 'AMSTERDAM',
  tz: 'Europe/Amsterdam'
}, {
  city: 'BARCELONA',
  tz: 'Europe/Madrid'
}, {
  city: 'CHICAGO',
  tz: 'America/Chicago'
}];
const MAIL = [{
  from: 'Priya Raman',
  subject: 'Q3 retail forecast — need your sign-off',
  time: '08:42',
  unread: true
}, {
  from: 'Shopify Plus',
  subject: 'Weekly store performance digest',
  time: '07:15',
  unread: true
}, {
  from: 'Dom Alvarez',
  subject: 'Re: influencer brief round 2',
  time: '06:58',
  unread: true
}, {
  from: 'Finance bot',
  subject: '3 invoices awaiting approval',
  time: 'Yest',
  unread: false
}];
const AGENDA = [{
  time: '09:00',
  title: 'Ops stand-up',
  meta: '15 min · Meet',
  now: true
}, {
  time: '11:30',
  title: 'Range review with buying',
  meta: '45 min · Level 3'
}, {
  time: '14:00',
  title: 'Agent approval sweep',
  meta: '30 min · Solo'
}, {
  time: '16:15',
  title: 'Weekly numbers w/ Priya',
  meta: '30 min · Zoom'
}];
const REMINDERS = [{
  title: 'Approve PO #4821 before cut-off',
  when: 'TODAY · 15:00',
  due: true
}, {
  title: 'Renew freight contract',
  when: 'TOMORROW · 09:00',
  due: true
}, {
  title: 'Quarterly stocktake prep',
  when: 'FRI · 10:00'
}];
const SIZES = {
  clocks: [4, 1],
  today: [2, 2],
  tasks: [2, 2],
  inbox: [2, 2],
  reminders: [2, 2]
};
const NAMES = {
  clocks: 'World clocks',
  today: 'Today',
  tasks: 'Tasks',
  inbox: 'Inbox',
  reminders: 'Reminders'
};
function PersonalHub({
  companyName
}) {
  const [order, setOrder] = React.useState(['clocks', 'today', 'tasks', 'inbox', 'reminders']);
  const [on, setOn] = React.useState({
    clocks: true,
    today: true,
    tasks: true,
    inbox: true,
    reminders: true
  });
  const [menu, setMenu] = React.useState(false);
  const [drag, setDrag] = React.useState(null);
  const [over, setOver] = React.useState(null);
  const [tasks, setTasks] = React.useState([{
    title: 'Sign off campaign budget',
    due: 'TODAY',
    done: false
  }, {
    title: 'Review agent write-permissions',
    due: 'TODAY',
    done: false
  }, {
    title: 'Send supplier brief',
    due: 'WED',
    done: true
  }, {
    title: 'Update stock cover thresholds',
    due: 'THU',
    done: false
  }, {
    title: 'Draft board update',
    due: 'NEXT WK',
    done: false
  }]);
  const move = (from, to) => {
    if (!from || from === to) return;
    setOrder(o => {
      const n = o.slice(),
        f = n.indexOf(from),
        t = n.indexOf(to);
      if (f < 0 || t < 0) return o;
      n.splice(t, 0, n.splice(f, 1)[0]);
      return n;
    });
  };
  const wrap = (id, i) => ({
    order: i,
    minWidth: 0,
    minHeight: 0,
    display: 'grid',
    gridTemplateRows: '1fr',
    gridColumn: 'span ' + SIZES[id][0],
    gridRow: 'span ' + SIZES[id][1],
    cursor: drag === id ? 'grabbing' : 'grab',
    opacity: drag === id ? 0.45 : 1,
    borderRadius: 7,
    outline: over === id && drag && drag !== id ? '2px dashed var(--tenant-accent, var(--accent))' : 'none',
    outlineOffset: 3,
    transition: 'opacity var(--dur-instant) ease'
  });
  const handlers = id => ({
    draggable: true,
    onDragStart: () => setDrag(id),
    onDragOver: e => {
      e.preventDefault();
      if (over !== id) setOver(id);
    },
    onDrop: e => {
      e.preventDefault();
      move(drag, id);
      setDrag(null);
      setOver(null);
    },
    onDragEnd: () => {
      setDrag(null);
      setOver(null);
    }
  });
  const todayLabel = new Intl.DateTimeFormat('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  }).format(new Date()).toUpperCase();
  const openCount = tasks.filter(t => !t.done).length;
  const widget = {
    clocks: /*#__PURE__*/React.createElement(HC, {
      title: "World clocks",
      meta: "LIVE"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))',
        gap: 12
      }
    }, ZONES.map(z => /*#__PURE__*/React.createElement("div", {
      key: z.city,
      style: {
        border: '1px solid var(--border-inner)',
        borderRadius: 'var(--radius-sm)',
        padding: 12,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement(AnalogClock, {
      city: z.city,
      timeZone: z.tz
    }))))),
    today: /*#__PURE__*/React.createElement(HC, {
      title: "Today",
      meta: todayLabel
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, AGENDA.map(e => /*#__PURE__*/React.createElement(AgendaRow, _extends({
      key: e.time
    }, e))))),
    tasks: /*#__PURE__*/React.createElement(HC, {
      title: "Tasks",
      meta: openCount + ' OPEN'
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, tasks.map((t, i) => /*#__PURE__*/React.createElement(TaskRow, {
      key: t.title,
      title: t.title,
      due: t.due,
      done: t.done,
      onToggle: () => setTasks(tasks.map((x, k) => k === i ? {
        ...x,
        done: !x.done
      } : x))
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        paddingTop: 4,
        borderTop: '1px solid var(--border-row)',
        fontSize: 12,
        color: 'var(--muted)'
      }
    }, "+ Add task")),
    inbox: /*#__PURE__*/React.createElement(HC, {
      flush: true,
      title: "Inbox",
      meta: /*#__PURE__*/React.createElement(HB, {
        tone: "accent",
        mono: false
      }, "3 unread")
    }, MAIL.map(m => /*#__PURE__*/React.createElement(ListRow, {
      key: m.from,
      title: m.from,
      subtitle: m.subject,
      time: m.time,
      unread: m.unread
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '10px 18px',
        borderTop: '1px solid var(--border-row)',
        fontSize: 12,
        color: 'var(--muted)'
      }
    }, "Open mailbox")),
    reminders: /*#__PURE__*/React.createElement(HC, {
      title: "Reminders",
      meta: "2 DUE SOON"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, REMINDERS.map(r => /*#__PURE__*/React.createElement("div", {
      key: r.title,
      style: {
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
        padding: '11px 12px',
        borderRadius: 'var(--radius-sm)',
        minWidth: 0,
        background: r.due ? 'var(--tenant-tint, var(--accent-tint))' : 'var(--surface-solid)',
        border: '1px solid ' + (r.due ? 'var(--tenant-border, var(--muted-25))' : 'var(--border-inner)')
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 8,
        height: 8,
        borderRadius: 99,
        marginTop: 4,
        flexShrink: 0,
        background: r.due ? 'var(--tenant-accent, var(--accent))' : 'var(--paper-500)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 'var(--weight-medium)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, r.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 'var(--weight-light)',
        fontSize: 12,
        color: 'var(--muted)',
        letterSpacing: 'var(--tracking-label-xs)'
      }
    }, r.when))))))
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 20,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(HML, null, "PERSONAL HUB"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 43,
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-display)'
    }
  }, companyName, " - Personal Hub"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--muted)',
      maxWidth: 620,
      textWrap: 'pretty'
    }
  }, "Your day across this workspace. Drag a widget to rearrange it, or open a module from the left rail.")), /*#__PURE__*/React.createElement(DropdownMenu, {
    trigger: "Widgets",
    label: "SHOW ON THIS HUB",
    open: menu,
    onToggle: () => setMenu(!menu)
  }, order.map(id => /*#__PURE__*/React.createElement(DropdownMenuItem, {
    key: id,
    onClick: () => setOn({
      ...on,
      [id]: !on[id]
    })
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: on[id]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 'var(--weight-medium)'
    }
  }, NAMES[id]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--muted)'
    }
  }, SIZES[id][0], " \xD7 ", SIZES[id][1], " blocks")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
      gridAutoRows: '168px',
      gridAutoFlow: 'dense',
      gap: 14
    }
  }, order.map((id, i) => on[id] ? /*#__PURE__*/React.createElement("div", _extends({
    key: id
  }, handlers(id), {
    style: wrap(id, i)
  }), widget[id]) : null)));
}
Object.assign(window, {
  PersonalHub
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/workspace/PersonalHub.jsx", error: String((e && e.message) || e) }); }

// ui_kits/workspace/Workspace.jsx
try { (() => {
const NSW = window.AutoSolutionsOSDesignSystem_884ce0;
const {
  AmbientBackground: AB,
  TopBar: TB,
  SideRail: SR,
  NavItem: NI,
  SearchField: SF,
  IconButton: IB,
  Avatar: AV,
  Button: BTN,
  MonoLabel: MLB,
  Icon: IC
} = NSW;
const TENANTS = {
  frank: {
    name: 'frank body',
    logo: '../../assets/tenants/frank.svg'
  },
  snouts: {
    name: 'senior snouts',
    logo: '../../assets/tenants/snouts.avif'
  },
  coreiq: {
    name: 'coreiQ',
    logo: '../../assets/tenants/coreiq.avif'
  },
  ledgify: {
    name: 'ledgify',
    logo: '../../assets/tenants/ledgify.png'
  }
};
const MODULES = [['marketing', 'Marketing', 'megaphone'], ['finance', 'Finance', 'wallet'], ['operations', 'Operations', 'boxes'], ['aitasks', 'AI Tasks', 'bot', 4], ['sales', 'Sales', 'trending-up'], ['comms', 'Internal Comms', 'messages-square'], ['projects', 'Project Mgt', 'kanban'], ['integrations', 'Integrations', 'plug']];
function Workspace({
  tenant = 'frank'
}) {
  const [view, setView] = React.useState(null);
  const [who, setWho] = React.useState(tenant);
  const t = TENANTS[who];
  const crumb = t.name.toUpperCase();
  const body = {
    marketing: /*#__PURE__*/React.createElement(window.Marketing, {
      crumb: crumb
    }),
    finance: /*#__PURE__*/React.createElement(window.Finance, {
      crumb: crumb
    }),
    operations: /*#__PURE__*/React.createElement(window.Operations, {
      crumb: crumb
    }),
    aitasks: /*#__PURE__*/React.createElement(window.AITasks, {
      crumb: crumb
    }),
    sales: /*#__PURE__*/React.createElement(window.Sales, {
      crumb: crumb
    }),
    comms: /*#__PURE__*/React.createElement(window.Comms, {
      crumb: crumb
    }),
    projects: /*#__PURE__*/React.createElement(window.Projects, {
      crumb: crumb
    }),
    integrations: /*#__PURE__*/React.createElement(window.Integrations, {
      crumb: crumb
    })
  };
  const cycle = () => {
    const ks = Object.keys(TENANTS);
    setWho(ks[(ks.indexOf(who) + 1) % ks.length]);
  };
  return /*#__PURE__*/React.createElement("div", {
    "data-tenant": who,
    style: {
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(AB, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(TB, {
    logo: "../../assets/logos/autosolutions-os-sm.png",
    onLogoClick: cycle,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IB, {
      title: "Notifications"
    }, /*#__PURE__*/React.createElement(IC, {
      name: "bell",
      size: 13
    })), /*#__PURE__*/React.createElement(AV, null), /*#__PURE__*/React.createElement(BTN, {
      tone: "secondary",
      size: "sm"
    }, "Sign out"))
  }, /*#__PURE__*/React.createElement(SF, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: 'flex',
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement(SR, {
    tenantLogo: t.logo,
    footerLabel: "WORKSPACE",
    footerRows: [{
      label: 'Settings'
    }, {
      label: 'Members & roles'
    }]
  }, /*#__PURE__*/React.createElement(NI, {
    active: view === null,
    onClick: () => setView(null),
    icon: /*#__PURE__*/React.createElement(IC, {
      name: "layout-grid"
    })
  }, "Personal Hub"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8
    }
  }), MODULES.map(m => /*#__PURE__*/React.createElement(NI, {
    key: m[0],
    active: view === m[0],
    onClick: () => setView(m[0]),
    count: m[3],
    icon: /*#__PURE__*/React.createElement(IC, {
      name: m[2]
    })
  }, m[1]))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      minHeight: 0,
      overflowY: 'auto',
      background: 'var(--surface-panel-veil)',
      padding: '28px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, view === null ? /*#__PURE__*/React.createElement(window.PersonalHub, {
    companyName: t.name
  }) : body[view]))));
}
Object.assign(window, {
  Workspace,
  TENANTS,
  MODULES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/workspace/Workspace.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.LiquidGlassButton = __ds_scope.LiquidGlassButton;

__ds_ns.MonoLabel = __ds_scope.MonoLabel;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.AgendaRow = __ds_scope.AgendaRow;

__ds_ns.AnalogClock = __ds_scope.AnalogClock;

__ds_ns.BarChart = __ds_scope.BarChart;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.SegmentBars = __ds_scope.SegmentBars;

__ds_ns.SeriesDot = __ds_scope.SeriesDot;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.TaskRow = __ds_scope.TaskRow;

__ds_ns.Loader = __ds_scope.Loader;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.DropdownMenu = __ds_scope.DropdownMenu;

__ds_ns.DropdownMenuItem = __ds_scope.DropdownMenuItem;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.NavItem = __ds_scope.NavItem;

__ds_ns.SearchField = __ds_scope.SearchField;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.SideRail = __ds_scope.SideRail;

__ds_ns.TopBar = __ds_scope.TopBar;

__ds_ns.AmbientBackground = __ds_scope.AmbientBackground;

__ds_ns.AppTile = __ds_scope.AppTile;

__ds_ns.BusinessCard = __ds_scope.BusinessCard;

__ds_ns.DarkPanel = __ds_scope.DarkPanel;

__ds_ns.DarkPanelRow = __ds_scope.DarkPanelRow;

__ds_ns.GlassCard = __ds_scope.GlassCard;

})();
