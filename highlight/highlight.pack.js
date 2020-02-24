/*! highlight.js v9.18.1 | BSD3 License | git.io/hljslicense */
!(function(e) {
  var n =
    ("object" == typeof window && window) || ("object" == typeof self && self);
  "undefined" == typeof exports || exports.nodeType
    ? n &&
      ((n.hljs = e({})),
      "function" == typeof define &&
        define.amd &&
        define([], function() {
          return n.hljs;
        }))
    : e(exports);
})(function(a) {
  var f = [],
    o = Object.keys,
    _ = {},
    g = {},
    C = !0,
    n = /^(no-?highlight|plain|text)$/i,
    E = /\blang(?:uage)?-([\w-]+)\b/i,
    t = /((^(<[^>]+>|\t|)+|(?:\n)))/gm,
    r = {
      case_insensitive: "cI",
      lexemes: "l",
      contains: "c",
      keywords: "k",
      subLanguage: "sL",
      className: "cN",
      begin: "b",
      beginKeywords: "bK",
      end: "e",
      endsWithParent: "eW",
      illegal: "i",
      excludeBegin: "eB",
      excludeEnd: "eE",
      returnBegin: "rB",
      returnEnd: "rE",
      variants: "v",
      IDENT_RE: "IR",
      UNDERSCORE_IDENT_RE: "UIR",
      NUMBER_RE: "NR",
      C_NUMBER_RE: "CNR",
      BINARY_NUMBER_RE: "BNR",
      RE_STARTERS_RE: "RSR",
      BACKSLASH_ESCAPE: "BE",
      APOS_STRING_MODE: "ASM",
      QUOTE_STRING_MODE: "QSM",
      PHRASAL_WORDS_MODE: "PWM",
      C_LINE_COMMENT_MODE: "CLCM",
      C_BLOCK_COMMENT_MODE: "CBCM",
      HASH_COMMENT_MODE: "HCM",
      NUMBER_MODE: "NM",
      C_NUMBER_MODE: "CNM",
      BINARY_NUMBER_MODE: "BNM",
      CSS_NUMBER_MODE: "CSSNM",
      REGEXP_MODE: "RM",
      TITLE_MODE: "TM",
      UNDERSCORE_TITLE_MODE: "UTM",
      COMMENT: "C",
      beginRe: "bR",
      endRe: "eR",
      illegalRe: "iR",
      lexemesRe: "lR",
      terminators: "t",
      terminator_end: "tE"
    },
    m = "</span>",
    O =
      "Could not find the language '{}', did you forget to load/include a language module?",
    B = {
      classPrefix: "hljs-",
      tabReplace: null,
      useBR: !1,
      languages: void 0
    },
    c = "of and for in not or if then".split(" ");
  function x(e) {
    return e
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function d(e) {
    return e.nodeName.toLowerCase();
  }
  function R(e) {
    return n.test(e);
  }
  function i(e) {
    var n,
      t = {},
      r = Array.prototype.slice.call(arguments, 1);
    for (n in e) t[n] = e[n];
    return (
      r.forEach(function(e) {
        for (n in e) t[n] = e[n];
      }),
      t
    );
  }
  function p(e) {
    var a = [];
    return (
      (function e(n, t) {
        for (var r = n.firstChild; r; r = r.nextSibling)
          3 === r.nodeType
            ? (t += r.nodeValue.length)
            : 1 === r.nodeType &&
              (a.push({ event: "start", offset: t, node: r }),
              (t = e(r, t)),
              d(r).match(/br|hr|img|input/) ||
                a.push({ event: "stop", offset: t, node: r }));
        return t;
      })(e, 0),
      a
    );
  }
  function v(e, n, t) {
    var r = 0,
      a = "",
      i = [];
    function o() {
      return e.length && n.length
        ? e[0].offset !== n[0].offset
          ? e[0].offset < n[0].offset
            ? e
            : n
          : "start" === n[0].event
          ? e
          : n
        : e.length
        ? e
        : n;
    }
    function c(e) {
      a +=
        "<" +
        d(e) +
        f.map
          .call(e.attributes, function(e) {
            return (
              " " + e.nodeName + '="' + x(e.value).replace(/"/g, "&quot;") + '"'
            );
          })
          .join("") +
        ">";
    }
    function l(e) {
      a += "</" + d(e) + ">";
    }
    function u(e) {
      ("start" === e.event ? c : l)(e.node);
    }
    for (; e.length || n.length; ) {
      var s = o();
      if (((a += x(t.substring(r, s[0].offset))), (r = s[0].offset), s === e)) {
        for (
          i.reverse().forEach(l);
          u(s.splice(0, 1)[0]),
            (s = o()) === e && s.length && s[0].offset === r;

        );
        i.reverse().forEach(c);
      } else
        "start" === s[0].event ? i.push(s[0].node) : i.pop(),
          u(s.splice(0, 1)[0]);
    }
    return a + x(t.substr(r));
  }
  function l(n) {
    return (
      n.v &&
        !n.cached_variants &&
        (n.cached_variants = n.v.map(function(e) {
          return i(n, { v: null }, e);
        })),
      n.cached_variants
        ? n.cached_variants
        : (function e(n) {
            return !!n && (n.eW || e(n.starts));
          })(n)
        ? [i(n, { starts: n.starts ? i(n.starts) : null })]
        : Object.isFrozen(n)
        ? [i(n)]
        : [n]
    );
  }
  function u(e) {
    if (r && !e.langApiRestored) {
      for (var n in ((e.langApiRestored = !0), r)) e[n] && (e[r[n]] = e[n]);
      (e.c || []).concat(e.v || []).forEach(u);
    }
  }
  function M(n, t) {
    var i = {};
    return (
      "string" == typeof n
        ? r("keyword", n)
        : o(n).forEach(function(e) {
            r(e, n[e]);
          }),
      i
    );
    function r(a, e) {
      t && (e = e.toLowerCase()),
        e.split(" ").forEach(function(e) {
          var n,
            t,
            r = e.split("|");
          i[r[0]] = [
            a,
            ((n = r[0]),
            (t = r[1])
              ? Number(t)
              : (function(e) {
                  return -1 != c.indexOf(e.toLowerCase());
                })(n)
              ? 0
              : 1)
          ];
        });
    }
  }
  function S(r) {
    function s(e) {
      return (e && e.source) || e;
    }
    function f(e, n) {
      return new RegExp(s(e), "m" + (r.cI ? "i" : "") + (n ? "g" : ""));
    }
    function a(a) {
      var i,
        e,
        o = {},
        c = [],
        l = {},
        t = 1;
      function n(e, n) {
        (o[t] = e),
          c.push([e, n]),
          (t += new RegExp(n.toString() + "|").exec("").length - 1 + 1);
      }
      for (var r = 0; r < a.c.length; r++) {
        n((e = a.c[r]), e.bK ? "\\.?(?:" + e.b + ")\\.?" : e.b);
      }
      a.tE && n("end", a.tE), a.i && n("illegal", a.i);
      var u = c.map(function(e) {
        return e[1];
      });
      return (
        (i = f(
          (function(e, n) {
            for (
              var t = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./,
                r = 0,
                a = "",
                i = 0;
              i < e.length;
              i++
            ) {
              var o = (r += 1),
                c = s(e[i]);
              for (0 < i && (a += n), a += "("; 0 < c.length; ) {
                var l = t.exec(c);
                if (null == l) {
                  a += c;
                  break;
                }
                (a += c.substring(0, l.index)),
                  (c = c.substring(l.index + l[0].length)),
                  "\\" == l[0][0] && l[1]
                    ? (a += "\\" + String(Number(l[1]) + o))
                    : ((a += l[0]), "(" == l[0] && r++);
              }
              a += ")";
            }
            return a;
          })(u, "|"),
          !0
        )),
        (l.lastIndex = 0),
        (l.exec = function(e) {
          var n;
          if (0 === c.length) return null;
          i.lastIndex = l.lastIndex;
          var t = i.exec(e);
          if (!t) return null;
          for (var r = 0; r < t.length; r++)
            if (null != t[r] && null != o["" + r]) {
              n = o["" + r];
              break;
            }
          return (
            "string" == typeof n
              ? ((t.type = n), (t.extra = [a.i, a.tE]))
              : ((t.type = "begin"), (t.rule = n)),
            t
          );
        }),
        l
      );
    }
    if (r.c && -1 != r.c.indexOf("self")) {
      if (!C)
        throw new Error(
          "ERR: contains `self` is not supported at the top-level of a language.  See documentation."
        );
      r.c = r.c.filter(function(e) {
        return "self" != e;
      });
    }
    !(function n(t, e) {
      t.compiled ||
        ((t.compiled = !0),
        (t.k = t.k || t.bK),
        t.k && (t.k = M(t.k, r.cI)),
        (t.lR = f(t.l || /\w+/, !0)),
        e &&
          (t.bK && (t.b = "\\b(" + t.bK.split(" ").join("|") + ")\\b"),
          t.b || (t.b = /\B|\b/),
          (t.bR = f(t.b)),
          t.endSameAsBegin && (t.e = t.b),
          t.e || t.eW || (t.e = /\B|\b/),
          t.e && (t.eR = f(t.e)),
          (t.tE = s(t.e) || ""),
          t.eW && e.tE && (t.tE += (t.e ? "|" : "") + e.tE)),
        t.i && (t.iR = f(t.i)),
        null == t.relevance && (t.relevance = 1),
        t.c || (t.c = []),
        (t.c = Array.prototype.concat.apply(
          [],
          t.c.map(function(e) {
            return l("self" === e ? t : e);
          })
        )),
        t.c.forEach(function(e) {
          n(e, t);
        }),
        t.starts && n(t.starts, e),
        (t.t = a(t)));
    })(r);
  }
  function T(n, e, a, t) {
    var i = e;
    function c(e, n, t, r) {
      if (!t && "" === n) return "";
      if (!e) return n;
      var a = '<span class="' + (r ? "" : B.classPrefix);
      return (a += e + '">') + n + (t ? "" : m);
    }
    function o() {
      (p += (null != d.sL
        ? function() {
            var e = "string" == typeof d.sL;
            if (e && !_[d.sL]) return x(v);
            var n = e
              ? T(d.sL, v, !0, R[d.sL])
              : w(v, d.sL.length ? d.sL : void 0);
            return (
              0 < d.relevance && (M += n.relevance),
              e && (R[d.sL] = n.top),
              c(n.language, n.value, !1, !0)
            );
          }
        : function() {
            var e, n, t, r, a, i, o;
            if (!d.k) return x(v);
            for (r = "", n = 0, d.lR.lastIndex = 0, t = d.lR.exec(v); t; )
              (r += x(v.substring(n, t.index))),
                (a = d),
                (i = t),
                (o = g.cI ? i[0].toLowerCase() : i[0]),
                (e = a.k.hasOwnProperty(o) && a.k[o])
                  ? ((M += e[1]), (r += c(e[0], x(t[0]))))
                  : (r += x(t[0])),
                (n = d.lR.lastIndex),
                (t = d.lR.exec(v));
            return r + x(v.substr(n));
          })()),
        (v = "");
    }
    function l(e) {
      (p += e.cN ? c(e.cN, "", !0) : ""),
        (d = Object.create(e, { parent: { value: d } }));
    }
    function u(e) {
      var n = e[0],
        t = e.rule;
      return (
        t &&
          t.endSameAsBegin &&
          (t.eR = new RegExp(n.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "m")),
        t.skip ? (v += n) : (t.eB && (v += n), o(), t.rB || t.eB || (v = n)),
        l(t),
        t.rB ? 0 : n.length
      );
    }
    function s(e) {
      var n = e[0],
        t = i.substr(e.index),
        r = (function e(n, t) {
          if (((r = n.eR), (a = t), (i = r && r.exec(a)) && 0 === i.index)) {
            for (; n.endsParent && n.parent; ) n = n.parent;
            return n;
          }
          var r, a, i;
          if (n.eW) return e(n.parent, t);
        })(d, t);
      if (r) {
        var a = d;
        for (
          a.skip ? (v += n) : (a.rE || a.eE || (v += n), o(), a.eE && (v = n));
          d.cN && (p += m),
            d.skip || d.sL || (M += d.relevance),
            (d = d.parent) !== r.parent;

        );
        return (
          r.starts && (r.endSameAsBegin && (r.starts.eR = r.eR), l(r.starts)),
          a.rE ? 0 : n.length
        );
      }
    }
    var f = {};
    function r(e, n) {
      var t = n && n[0];
      if (((v += e), null == t)) return o(), 0;
      if (
        "begin" == f.type &&
        "end" == n.type &&
        f.index == n.index &&
        "" === t
      )
        return (v += i.slice(n.index, n.index + 1)), 1;
      if ("begin" === (f = n).type) return u(n);
      if ("illegal" === n.type && !a)
        throw new Error(
          'Illegal lexeme "' + t + '" for mode "' + (d.cN || "<unnamed>") + '"'
        );
      if ("end" === n.type) {
        var r = s(n);
        if (null != r) return r;
      }
      return (v += t), t.length;
    }
    var g = D(n);
    if (!g)
      throw (console.error(O.replace("{}", n)),
      new Error('Unknown language: "' + n + '"'));
    S(g);
    var E,
      d = t || g,
      R = {},
      p = "";
    for (E = d; E !== g; E = E.parent) E.cN && (p = c(E.cN, "", !0) + p);
    var v = "",
      M = 0;
    try {
      for (var b, h, N = 0; (d.t.lastIndex = N), (b = d.t.exec(i)); )
        (h = r(i.substring(N, b.index), b)), (N = b.index + h);
      for (r(i.substr(N)), E = d; E.parent; E = E.parent) E.cN && (p += m);
      return { relevance: M, value: p, i: !1, language: n, top: d };
    } catch (e) {
      if (e.message && -1 !== e.message.indexOf("Illegal"))
        return { i: !0, relevance: 0, value: x(i) };
      if (C)
        return {
          relevance: 0,
          value: x(i),
          language: n,
          top: d,
          errorRaised: e
        };
      throw e;
    }
  }
  function w(t, e) {
    e = e || B.languages || o(_);
    var r = { relevance: 0, value: x(t) },
      a = r;
    return (
      e
        .filter(D)
        .filter(L)
        .forEach(function(e) {
          var n = T(e, t, !1);
          (n.language = e),
            n.relevance > a.relevance && (a = n),
            n.relevance > r.relevance && ((a = r), (r = n));
        }),
      a.language && (r.second_best = a),
      r
    );
  }
  function b(e) {
    return B.tabReplace || B.useBR
      ? e.replace(t, function(e, n) {
          return B.useBR && "\n" === e
            ? "<br>"
            : B.tabReplace
            ? n.replace(/\t/g, B.tabReplace)
            : "";
        })
      : e;
  }
  function s(e) {
    var n,
      t,
      r,
      a,
      i,
      o,
      c,
      l,
      u,
      s,
      f = (function(e) {
        var n,
          t,
          r,
          a,
          i = e.className + " ";
        if (
          ((i += e.parentNode ? e.parentNode.className : ""), (t = E.exec(i)))
        ) {
          var o = D(t[1]);
          return (
            o ||
              (console.warn(O.replace("{}", t[1])),
              console.warn(
                "Falling back to no-highlight mode for this block.",
                e
              )),
            o ? t[1] : "no-highlight"
          );
        }
        for (n = 0, r = (i = i.split(/\s+/)).length; n < r; n++)
          if (R((a = i[n])) || D(a)) return a;
      })(e);
    R(f) ||
      (B.useBR
        ? ((n = document.createElement("div")).innerHTML = e.innerHTML
            .replace(/\n/g, "")
            .replace(/<br[ \/]*>/g, "\n"))
        : (n = e),
      (i = n.textContent),
      (r = f ? T(f, i, !0) : w(i)),
      (t = p(n)).length &&
        (((a = document.createElement("div")).innerHTML = r.value),
        (r.value = v(t, p(a), i))),
      (r.value = b(r.value)),
      (e.innerHTML = r.value),
      (e.className =
        ((o = e.className),
        (c = f),
        (l = r.language),
        (u = c ? g[c] : l),
        (s = [o.trim()]),
        o.match(/\bhljs\b/) || s.push("hljs"),
        -1 === o.indexOf(u) && s.push(u),
        s.join(" ").trim())),
      (e.result = { language: r.language, re: r.relevance }),
      r.second_best &&
        (e.second_best = {
          language: r.second_best.language,
          re: r.second_best.relevance
        }));
  }
  function h() {
    if (!h.called) {
      h.called = !0;
      var e = document.querySelectorAll("pre code");
      f.forEach.call(e, s);
    }
  }
  var N = { disableAutodetect: !0 };
  function D(e) {
    return (e = (e || "").toLowerCase()), _[e] || _[g[e]];
  }
  function L(e) {
    var n = D(e);
    return n && !n.disableAutodetect;
  }
  return (
    (a.highlight = T),
    (a.highlightAuto = w),
    (a.fixMarkup = b),
    (a.highlightBlock = s),
    (a.configure = function(e) {
      B = i(B, e);
    }),
    (a.initHighlighting = h),
    (a.initHighlightingOnLoad = function() {
      window.addEventListener("DOMContentLoaded", h, !1),
        window.addEventListener("load", h, !1);
    }),
    (a.registerLanguage = function(n, e) {
      var t;
      try {
        t = e(a);
      } catch (e) {
        if (
          (console.error(
            "Language definition for '{}' could not be registered.".replace(
              "{}",
              n
            )
          ),
          !C)
        )
          throw e;
        console.error(e), (t = N);
      }
      u((_[n] = t)),
        (t.rawDefinition = e.bind(null, a)),
        t.aliases &&
          t.aliases.forEach(function(e) {
            g[e] = n;
          });
    }),
    (a.listLanguages = function() {
      return o(_);
    }),
    (a.getLanguage = D),
    (a.requireLanguage = function(e) {
      var n = D(e);
      if (n) return n;
      throw new Error(
        "The '{}' language is required, but not loaded.".replace("{}", e)
      );
    }),
    (a.autoDetection = L),
    (a.inherit = i),
    (a.debugMode = function() {
      C = !1;
    }),
    (a.IR = a.IDENT_RE = "[a-zA-Z]\\w*"),
    (a.UIR = a.UNDERSCORE_IDENT_RE = "[a-zA-Z_]\\w*"),
    (a.NR = a.NUMBER_RE = "\\b\\d+(\\.\\d+)?"),
    (a.CNR = a.C_NUMBER_RE =
      "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)"),
    (a.BNR = a.BINARY_NUMBER_RE = "\\b(0b[01]+)"),
    (a.RSR = a.RE_STARTERS_RE =
      "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~"),
    (a.BE = a.BACKSLASH_ESCAPE = { b: "\\\\[\\s\\S]", relevance: 0 }),
    (a.ASM = a.APOS_STRING_MODE = {
      cN: "string",
      b: "'",
      e: "'",
      i: "\\n",
      c: [a.BE]
    }),
    (a.QSM = a.QUOTE_STRING_MODE = {
      cN: "string",
      b: '"',
      e: '"',
      i: "\\n",
      c: [a.BE]
    }),
    (a.PWM = a.PHRASAL_WORDS_MODE = {
      b: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
    }),
    (a.C = a.COMMENT = function(e, n, t) {
      var r = a.inherit({ cN: "comment", b: e, e: n, c: [] }, t || {});
      return (
        r.c.push(a.PWM),
        r.c.push({
          cN: "doctag",
          b: "(?:TODO|FIXME|NOTE|BUG|XXX):",
          relevance: 0
        }),
        r
      );
    }),
    (a.CLCM = a.C_LINE_COMMENT_MODE = a.C("//", "$")),
    (a.CBCM = a.C_BLOCK_COMMENT_MODE = a.C("/\\*", "\\*/")),
    (a.HCM = a.HASH_COMMENT_MODE = a.C("#", "$")),
    (a.NM = a.NUMBER_MODE = { cN: "number", b: a.NR, relevance: 0 }),
    (a.CNM = a.C_NUMBER_MODE = { cN: "number", b: a.CNR, relevance: 0 }),
    (a.BNM = a.BINARY_NUMBER_MODE = { cN: "number", b: a.BNR, relevance: 0 }),
    (a.CSSNM = a.CSS_NUMBER_MODE = {
      cN: "number",
      b:
        a.NR +
        "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
      relevance: 0
    }),
    (a.RM = a.REGEXP_MODE = {
      cN: "regexp",
      b: /\//,
      e: /\/[gimuy]*/,
      i: /\n/,
      c: [a.BE, { b: /\[/, e: /\]/, relevance: 0, c: [a.BE] }]
    }),
    (a.TM = a.TITLE_MODE = { cN: "title", b: a.IR, relevance: 0 }),
    (a.UTM = a.UNDERSCORE_TITLE_MODE = { cN: "title", b: a.UIR, relevance: 0 }),
    (a.METHOD_GUARD = { b: "\\.\\s*" + a.UIR, relevance: 0 }),
    [
      a.BE,
      a.ASM,
      a.QSM,
      a.PWM,
      a.C,
      a.CLCM,
      a.CBCM,
      a.HCM,
      a.NM,
      a.CNM,
      a.BNM,
      a.CSSNM,
      a.RM,
      a.TM,
      a.UTM,
      a.METHOD_GUARD
    ].forEach(function(e) {
      !(function n(t) {
        Object.freeze(t);
        var r = "function" == typeof t;
        Object.getOwnPropertyNames(t).forEach(function(e) {
          !t.hasOwnProperty(e) ||
            null === t[e] ||
            ("object" != typeof t[e] && "function" != typeof t[e]) ||
            (r && ("caller" === e || "callee" === e || "arguments" === e)) ||
            Object.isFrozen(t[e]) ||
            n(t[e]);
        });
        return t;
      })(e);
    }),
    a
  );
});
hljs.registerLanguage("css", function(e) {
  var c = {
    b: /(?:[A-Z\_\.\-]+|--[a-zA-Z0-9_-]+)\s*:/,
    rB: !0,
    e: ";",
    eW: !0,
    c: [
      {
        cN: "attribute",
        b: /\S/,
        e: ":",
        eE: !0,
        starts: {
          eW: !0,
          eE: !0,
          c: [
            {
              b: /[\w-]+\(/,
              rB: !0,
              c: [
                { cN: "built_in", b: /[\w-]+/ },
                { b: /\(/, e: /\)/, c: [e.ASM, e.QSM, e.CSSNM] }
              ]
            },
            e.CSSNM,
            e.QSM,
            e.ASM,
            e.CBCM,
            { cN: "number", b: "#[0-9A-Fa-f]+" },
            { cN: "meta", b: "!important" }
          ]
        }
      }
    ]
  };
  return {
    cI: !0,
    i: /[=\/|'\$]/,
    c: [
      e.CBCM,
      { cN: "selector-id", b: /#[A-Za-z0-9_-]+/ },
      { cN: "selector-class", b: /\.[A-Za-z0-9_-]+/ },
      { cN: "selector-attr", b: /\[/, e: /\]/, i: "$", c: [e.ASM, e.QSM] },
      { cN: "selector-pseudo", b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/ },
      { b: "@(page|font-face)", l: "@[a-z-]+", k: "@page @font-face" },
      {
        b: "@",
        e: "[{;]",
        i: /:/,
        rB: !0,
        c: [
          { cN: "keyword", b: /@\-?\w[\w]*(\-\w+)*/ },
          {
            b: /\s/,
            eW: !0,
            eE: !0,
            relevance: 0,
            k: "and or not only",
            c: [{ b: /[a-z-]+:/, cN: "attribute" }, e.ASM, e.QSM, e.CSSNM]
          }
        ]
      },
      { cN: "selector-tag", b: "[a-zA-Z-][a-zA-Z0-9_-]*", relevance: 0 },
      { b: "{", e: "}", i: /\S/, c: [e.CBCM, c] }
    ]
  };
});
hljs.registerLanguage("xml", function(e) {
  var c = { cN: "symbol", b: "&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;" },
    s = {
      b: "\\s",
      c: [{ cN: "meta-keyword", b: "#?[a-z_][a-z1-9_-]+", i: "\\n" }]
    },
    a = e.inherit(s, { b: "\\(", e: "\\)" }),
    t = e.inherit(e.ASM, { cN: "meta-string" }),
    l = e.inherit(e.QSM, { cN: "meta-string" }),
    r = {
      eW: !0,
      i: /</,
      relevance: 0,
      c: [
        { cN: "attr", b: "[A-Za-z0-9\\._:-]+", relevance: 0 },
        {
          b: /=\s*/,
          relevance: 0,
          c: [
            {
              cN: "string",
              endsParent: !0,
              v: [
                { b: /"/, e: /"/, c: [c] },
                { b: /'/, e: /'/, c: [c] },
                { b: /[^\s"'=<>`]+/ }
              ]
            }
          ]
        }
      ]
    };
  return {
    aliases: [
      "html",
      "xhtml",
      "rss",
      "atom",
      "xjb",
      "xsd",
      "xsl",
      "plist",
      "wsf",
      "svg"
    ],
    cI: !0,
    c: [
      {
        cN: "meta",
        b: "<![a-z]",
        e: ">",
        relevance: 10,
        c: [
          s,
          l,
          t,
          a,
          {
            b: "\\[",
            e: "\\]",
            c: [{ cN: "meta", b: "<![a-z]", e: ">", c: [s, a, l, t] }]
          }
        ]
      },
      e.C("\x3c!--", "--\x3e", { relevance: 10 }),
      { b: "<\\!\\[CDATA\\[", e: "\\]\\]>", relevance: 10 },
      c,
      { cN: "meta", b: /<\?xml/, e: /\?>/, relevance: 10 },
      {
        b: /<\?(php)?/,
        e: /\?>/,
        sL: "php",
        c: [
          { b: "/\\*", e: "\\*/", skip: !0 },
          { b: 'b"', e: '"', skip: !0 },
          { b: "b'", e: "'", skip: !0 },
          e.inherit(e.ASM, { i: null, cN: null, c: null, skip: !0 }),
          e.inherit(e.QSM, { i: null, cN: null, c: null, skip: !0 })
        ]
      },
      {
        cN: "tag",
        b: "<style(?=\\s|>)",
        e: ">",
        k: { name: "style" },
        c: [r],
        starts: { e: "</style>", rE: !0, sL: ["css", "xml"] }
      },
      {
        cN: "tag",
        b: "<script(?=\\s|>)",
        e: ">",
        k: { name: "script" },
        c: [r],
        starts: {
          e: "</script>",
          rE: !0,
          sL: ["actionscript", "javascript", "handlebars", "xml"]
        }
      },
      {
        cN: "tag",
        b: "</?",
        e: "/?>",
        c: [{ cN: "name", b: /[^\/><\s]+/, relevance: 0 }, r]
      }
    ]
  };
});
hljs.registerLanguage("markdown", function(e) {
  return {
    aliases: ["md", "mkdown", "mkd"],
    c: [
      {
        cN: "section",
        v: [{ b: "^#{1,6}", e: "$" }, { b: "^.+?\\n[=-]{2,}$" }]
      },
      { b: "<", e: ">", sL: "xml", relevance: 0 },
      { cN: "bullet", b: "^\\s*([*+-]|(\\d+\\.))\\s+" },
      { cN: "strong", b: "[*_]{2}.+?[*_]{2}" },
      { cN: "emphasis", v: [{ b: "\\*.+?\\*" }, { b: "_.+?_", relevance: 0 }] },
      { cN: "quote", b: "^>\\s+", e: "$" },
      {
        cN: "code",
        v: [
          { b: "^```\\w*\\s*$", e: "^```[ ]*$" },
          { b: "`.+?`" },
          { b: "^( {4}|\\t)", e: "$", relevance: 0 }
        ]
      },
      { b: "^[-\\*]{3,}", e: "$" },
      {
        b: "\\[.+?\\][\\(\\[].*?[\\)\\]]",
        rB: !0,
        c: [
          { cN: "string", b: "\\[", e: "\\]", eB: !0, rE: !0, relevance: 0 },
          { cN: "link", b: "\\]\\(", e: "\\)", eB: !0, eE: !0 },
          { cN: "symbol", b: "\\]\\[", e: "\\]", eB: !0, eE: !0 }
        ],
        relevance: 10
      },
      {
        b: /^\[[^\n]+\]:/,
        rB: !0,
        c: [
          { cN: "symbol", b: /\[/, e: /\]/, eB: !0, eE: !0 },
          { cN: "link", b: /:\s*/, e: /$/, eB: !0 }
        ]
      }
    ]
  };
});
hljs.registerLanguage("typescript", function(e) {
  var r = "[A-Za-z$_][0-9A-Za-z$_]*",
    t = {
      keyword:
        "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class public private protected get set super static implements enum export import declare type namespace abstract as from extends async await",
      literal: "true false null undefined NaN Infinity",
      built_in:
        "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document any number boolean string void Promise"
    },
    n = { cN: "meta", b: "@" + r },
    a = { b: "\\(", e: /\)/, k: t, c: ["self", e.QSM, e.ASM, e.NM] },
    c = {
      cN: "params",
      b: /\(/,
      e: /\)/,
      eB: !0,
      eE: !0,
      k: t,
      c: [e.CLCM, e.CBCM, n, a]
    },
    s = {
      cN: "number",
      v: [
        { b: "\\b(0[bB][01]+)n?" },
        { b: "\\b(0[oO][0-7]+)n?" },
        { b: e.CNR + "n?" }
      ],
      relevance: 0
    },
    o = { cN: "subst", b: "\\$\\{", e: "\\}", k: t, c: [] },
    i = {
      b: "html`",
      e: "",
      starts: { e: "`", rE: !1, c: [e.BE, o], sL: "xml" }
    },
    l = {
      b: "css`",
      e: "",
      starts: { e: "`", rE: !1, c: [e.BE, o], sL: "css" }
    },
    b = { cN: "string", b: "`", e: "`", c: [e.BE, o] };
  return (
    (o.c = [e.ASM, e.QSM, i, l, b, s, e.RM]),
    {
      aliases: ["ts"],
      k: t,
      c: [
        { cN: "meta", b: /^\s*['"]use strict['"]/ },
        e.ASM,
        e.QSM,
        i,
        l,
        b,
        e.CLCM,
        e.CBCM,
        s,
        {
          b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
          k: "return throw case",
          c: [
            e.CLCM,
            e.CBCM,
            e.RM,
            {
              cN: "function",
              b: "(\\(.*?\\)|" + e.IR + ")\\s*=>",
              rB: !0,
              e: "\\s*=>",
              c: [
                {
                  cN: "params",
                  v: [
                    { b: e.IR },
                    { b: /\(\s*\)/ },
                    {
                      b: /\(/,
                      e: /\)/,
                      eB: !0,
                      eE: !0,
                      k: t,
                      c: ["self", e.CLCM, e.CBCM]
                    }
                  ]
                }
              ]
            }
          ],
          relevance: 0
        },
        {
          cN: "function",
          bK: "function",
          e: /[\{;]/,
          eE: !0,
          k: t,
          c: ["self", e.inherit(e.TM, { b: r }), c],
          i: /%/,
          relevance: 0
        },
        { bK: "constructor", e: /[\{;]/, eE: !0, c: ["self", c] },
        { b: /module\./, k: { built_in: "module" }, relevance: 0 },
        { bK: "module", e: /\{/, eE: !0 },
        { bK: "interface", e: /\{/, eE: !0, k: "interface extends" },
        { b: /\$[(.]/ },
        { b: "\\." + e.IR, relevance: 0 },
        n,
        a
      ]
    }
  );
});
hljs.registerLanguage("javascript", function(e) {
  var r = "<>",
    a = "</>",
    t = { b: /<[A-Za-z0-9\\._:-]+/, e: /\/[A-Za-z0-9\\._:-]+>|\/>/ },
    c = "[A-Za-z$_][0-9A-Za-z$_]*",
    n = {
      keyword:
        "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",
      literal: "true false null undefined NaN Infinity",
      built_in:
        "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"
    },
    s = {
      cN: "number",
      v: [
        { b: "\\b(0[bB][01]+)n?" },
        { b: "\\b(0[oO][0-7]+)n?" },
        { b: e.CNR + "n?" }
      ],
      relevance: 0
    },
    o = { cN: "subst", b: "\\$\\{", e: "\\}", k: n, c: [] },
    i = {
      b: "html`",
      e: "",
      starts: { e: "`", rE: !1, c: [e.BE, o], sL: "xml" }
    },
    b = {
      b: "css`",
      e: "",
      starts: { e: "`", rE: !1, c: [e.BE, o], sL: "css" }
    },
    l = { cN: "string", b: "`", e: "`", c: [e.BE, o] };
  o.c = [e.ASM, e.QSM, i, b, l, s, e.RM];
  var u = o.c.concat([e.CBCM, e.CLCM]);
  return {
    aliases: ["js", "jsx", "mjs", "cjs"],
    k: n,
    c: [
      { cN: "meta", relevance: 10, b: /^\s*['"]use (strict|asm)['"]/ },
      { cN: "meta", b: /^#!/, e: /$/ },
      e.ASM,
      e.QSM,
      i,
      b,
      l,
      e.CLCM,
      e.C("/\\*\\*", "\\*/", {
        relevance: 0,
        c: [
          {
            cN: "doctag",
            b: "@[A-Za-z]+",
            c: [
              { cN: "type", b: "\\{", e: "\\}", relevance: 0 },
              {
                cN: "variable",
                b: c + "(?=\\s*(-)|$)",
                endsParent: !0,
                relevance: 0
              },
              { b: /(?=[^\n])\s/, relevance: 0 }
            ]
          }
        ]
      }),
      e.CBCM,
      s,
      {
        b: /[{,\n]\s*/,
        relevance: 0,
        c: [
          {
            b: c + "\\s*:",
            rB: !0,
            relevance: 0,
            c: [{ cN: "attr", b: c, relevance: 0 }]
          }
        ]
      },
      {
        b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
        k: "return throw case",
        c: [
          e.CLCM,
          e.CBCM,
          e.RM,
          {
            cN: "function",
            b: "(\\(.*?\\)|" + c + ")\\s*=>",
            rB: !0,
            e: "\\s*=>",
            c: [
              {
                cN: "params",
                v: [
                  { b: c },
                  { b: /\(\s*\)/ },
                  { b: /\(/, e: /\)/, eB: !0, eE: !0, k: n, c: u }
                ]
              }
            ]
          },
          { cN: "", b: /\s/, e: /\s*/, skip: !0 },
          {
            v: [
              { b: r, e: a },
              { b: t.b, e: t.e }
            ],
            sL: "xml",
            c: [{ b: t.b, e: t.e, skip: !0, c: ["self"] }]
          }
        ],
        relevance: 0
      },
      {
        cN: "function",
        bK: "function",
        e: /\{/,
        eE: !0,
        c: [
          e.inherit(e.TM, { b: c }),
          { cN: "params", b: /\(/, e: /\)/, eB: !0, eE: !0, c: u }
        ],
        i: /\[|%/
      },
      { b: /\$[(.]/ },
      e.METHOD_GUARD,
      {
        cN: "class",
        bK: "class",
        e: /[{;=]/,
        eE: !0,
        i: /[:"\[\]]/,
        c: [{ bK: "extends" }, e.UTM]
      },
      { bK: "constructor get set", e: /\{/, eE: !0 }
    ],
    i: /#(?!!)/
  };
});
hljs.registerLanguage("json", function(e) {
  var i = { literal: "true false null" },
    n = [e.CLCM, e.CBCM],
    c = [e.QSM, e.CNM],
    r = { e: ",", eW: !0, eE: !0, c: c, k: i },
    t = {
      b: "{",
      e: "}",
      c: [
        { cN: "attr", b: /"/, e: /"/, c: [e.BE], i: "\\n" },
        e.inherit(r, { b: /:/ })
      ].concat(n),
      i: "\\S"
    },
    a = { b: "\\[", e: "\\]", c: [e.inherit(r)], i: "\\S" };
  return (
    c.push(t, a),
    n.forEach(function(e) {
      c.push(e);
    }),
    { c: c, k: i, i: "\\S" }
  );
});
