#!/usr/bin/env python3
"""Build the Kablanet screen-tour page from pages.json + clips.json."""
import json, html, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
pages = json.load(open(os.path.join(HERE, "pages.json")))["pages"]
clips_path = os.path.join(HERE, "clips.json")
clips = json.load(open(clips_path)) if os.path.exists(clips_path) else {}
flow = json.load(open(os.path.join(HERE, "flow.json")))

GROUPS = ["Setting up", "Every day", "Getting paid", "Who you work with",
          "What it costs you", "Winning work", "Everything else"]

GROUP_NOTE = {
    "Setting up": "Ten minutes, once, before you invoice anyone.",
    "Every day": "The screens you'll live in.",
    "Getting paid": "Billing, chasing, and recording the money that arrives.",
    "Who you work with": "Customers on one side, your subs and suppliers on the other.",
    "What it costs you": "The other half of every job.",
    "Winning work": "Quoting, and pricing a job before you commit to it.",
    "Everything else": "Useful, but nothing you need on day one.",
}

CSS = """
:root{
 --paper:#F4F6F8;--card:#FFFFFF;--card-2:#FAFBFC;--ink:#141C26;--ink-2:#4C5967;--ink-3:#7C8894;
 --line:#E1E7ED;--line-soft:#EEF2F5;--deep:#1B2430;--deep-2:#2A3644;--deep-ink:#D8E2EC;--deep-ink-2:#93A2B2;
 --accent:#0B63CE;--accent-2:#084EA6;--accent-soft:#E7F0FC;--on-accent:#FFFFFF;
 --pos:#12855C;--warn:#A96E06;--film:#EDF1F5;
 --shadow:0 1px 2px rgba(20,28,38,.05),0 8px 24px -12px rgba(20,28,38,.18);
 --shadow-lift:0 2px 4px rgba(20,28,38,.06),0 18px 40px -18px rgba(20,28,38,.28);
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
 --paper:#0C131B;--card:#141D27;--card-2:#18222E;--ink:#E9EFF5;--ink-2:#A7B5C2;--ink-3:#7A8794;
 --line:#24313F;--line-soft:#1C2733;--deep:#080E15;--deep-2:#16202B;--deep-ink:#DCE6F0;--deep-ink-2:#8A99A9;
 --accent:#5AA6FF;--accent-2:#8CC2FF;--accent-soft:#122740;--on-accent:#08121E;
 --pos:#3FCB90;--warn:#E3A63E;--film:#101923;
 --shadow:0 1px 2px rgba(0,0,0,.4),0 10px 28px -14px rgba(0,0,0,.7);
 --shadow-lift:0 2px 6px rgba(0,0,0,.45),0 20px 44px -18px rgba(0,0,0,.8);
}}
:root[data-theme="dark"]{
 --paper:#0C131B;--card:#141D27;--card-2:#18222E;--ink:#E9EFF5;--ink-2:#A7B5C2;--ink-3:#7A8794;
 --line:#24313F;--line-soft:#1C2733;--deep:#080E15;--deep-2:#16202B;--deep-ink:#DCE6F0;--deep-ink-2:#8A99A9;
 --accent:#5AA6FF;--accent-2:#8CC2FF;--accent-soft:#122740;--on-accent:#08121E;
 --pos:#3FCB90;--warn:#E3A63E;--film:#101923;
 --shadow:0 1px 2px rgba(0,0,0,.4),0 10px 28px -14px rgba(0,0,0,.7);
 --shadow-lift:0 2px 6px rgba(0,0,0,.45),0 20px 44px -18px rgba(0,0,0,.8);
}
*{box-sizing:border-box}
body{background:var(--paper);color:var(--ink);font-family:"IBM Plex Sans",ui-sans-serif,system-ui,sans-serif;
 font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:Archivo,"IBM Plex Sans",sans-serif;margin:0;letter-spacing:-.015em;text-wrap:balance}
p{margin:0}
a{color:var(--accent)}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:4px}
.eyebrow{font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:11px;font-weight:500;
 letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3)}

.hero{background:var(--deep);color:var(--deep-ink);padding:52px 24px 76px;position:relative;overflow:hidden}
.hero::after{content:"";position:absolute;inset:0;background-image:
 linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
 linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
 background-size:26px 26px;mask-image:radial-gradient(120% 90% at 80% 8%,#000,transparent 68%);pointer-events:none}
.hero-in{max-width:1180px;margin:0 auto;position:relative;z-index:1}
.hero .eyebrow{color:var(--deep-ink-2)}
.hero h1{font-size:clamp(32px,5.4vw,52px);font-weight:700;line-height:1.05;letter-spacing:-.03em;
 margin:14px 0 0;color:#FFF;max-width:16ch}
.hero p.lede{margin-top:18px;max-width:56ch;font-size:clamp(15.5px,2vw,18px);color:var(--deep-ink)}
.hero-meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:26px}
.pill{border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);border-radius:999px;
 padding:6px 13px;font-size:13px;color:var(--deep-ink)}

.shell{max-width:1180px;margin:-46px auto 0;padding:0 24px 90px;display:grid;
 grid-template-columns:210px minmax(0,1fr);gap:40px;position:relative;z-index:2}
.spine-in{position:sticky;top:22px;background:var(--deep-2);border-radius:12px;padding:14px 10px;
 box-shadow:var(--shadow-lift)}
.spine-head{display:flex;align-items:center;gap:9px;padding:4px 8px 12px;
 border-bottom:1px solid rgba(255,255,255,.09);margin-bottom:8px}
.mark{width:26px;height:26px;border-radius:7px;background:var(--accent);color:var(--on-accent);
 display:grid;place-items:center;font-family:Archivo,sans-serif;font-weight:700;font-size:13px;flex:none}
.spine-head span{color:#FFF;font-weight:600;font-size:13.5px}
.spine a{display:block;padding:7px 9px;border-radius:7px;color:var(--deep-ink);text-decoration:none;
 font-size:13px;transition:background .15s,color .15s}
.spine a:hover{background:rgba(255,255,255,.07);color:#FFF}
.spine a.active{background:rgba(255,255,255,.12);color:#FFF;font-weight:600}
.col{max-width:820px;min-width:0;padding-top:56px}

.group{scroll-margin-top:20px}
.group+.group{margin-top:52px}
.group-head{margin-bottom:18px}
.group-head h2{font-size:clamp(21px,3vw,26px);font-weight:700;margin-top:7px}
.group-head p{color:var(--ink-2);margin-top:6px}

.screen{background:var(--card);border:1px solid var(--line);border-radius:12px;
 box-shadow:var(--shadow);overflow:hidden}
.screen+.screen{margin-top:16px}
.s-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 11px;padding:17px 19px 0}
.s-head h3{font-size:18.5px;font-weight:600}
.route{font-family:"IBM Plex Mono",monospace;font-size:11.5px;color:var(--ink-3);
 background:var(--line-soft);border-radius:5px;padding:2px 7px}
.open{margin-left:auto;font-size:13.5px;font-weight:600;text-decoration:none;white-space:nowrap}
.open:hover{text-decoration:underline}
.blurb{padding:6px 19px 0;color:var(--ink-2);font-size:14.5px}
.s-body{display:grid;gap:18px;padding:16px 19px 19px}
@media (min-width:760px){.s-body{grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);align-items:start}}
.s-body p.script{color:var(--ink-2);font-size:15px;line-height:1.65}

.clip{position:relative;border-radius:9px;overflow:hidden;background:var(--film);
 border:1px solid var(--line);aspect-ratio:16/10}
.clip video{display:block;width:100%;height:100%;object-fit:cover;background:#000}
.pending{position:absolute;inset:0;display:grid;place-content:center;justify-items:center;gap:9px;
 text-align:center;padding:18px;color:var(--ink-3)}
.pending .slate{width:38px;height:38px;border-radius:9px;border:1.5px dashed var(--ink-3);
 display:grid;place-items:center;opacity:.75}
.pending .slate::after{content:"";width:0;height:0;border-left:11px solid currentColor;
 border-top:7px solid transparent;border-bottom:7px solid transparent;margin-left:3px}
.pending b{display:block;font-size:13px;font-weight:600;color:var(--ink-2)}
.pending span{font-size:12px}
.dur{position:absolute;right:8px;bottom:8px;background:rgba(0,0,0,.62);color:#fff;
 font-family:"IBM Plex Mono",monospace;font-size:11px;border-radius:4px;padding:2px 6px}

.flowsec{scroll-margin-top:20px;margin-top:52px}
.flow-intro{color:var(--ink-2);margin-top:8px;max-width:62ch}
.step{background:var(--card);border:1px solid var(--line);border-radius:12px;box-shadow:var(--shadow);
 overflow:hidden;position:relative}
.step+.step{margin-top:14px}
.step::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--accent);opacity:.75}
.step-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 11px;padding:17px 19px 0 22px}
.step-n{font-family:"IBM Plex Mono",monospace;font-size:11.5px;font-weight:500;color:var(--accent);
 background:var(--accent-soft);border-radius:999px;padding:2px 9px}
.step-head h3{font-size:18.5px;font-weight:600}
.step-body{display:grid;gap:18px;padding:12px 19px 19px 22px}
@media (min-width:760px){.step-body{grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);align-items:start}}
.step-body p.script{color:var(--ink-2);font-size:15px;line-height:1.65}
.moves{margin-top:14px;border-top:1px solid var(--line-soft);padding-top:12px;display:grid;gap:7px}
.moves .mv{display:grid;grid-template-columns:132px 1fr;gap:11px;font-size:13.5px;align-items:baseline}
@media (max-width:520px){.moves .mv{grid-template-columns:1fr;gap:2px}}
.moves .where{font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.05em;
 text-transform:uppercase;color:var(--accent)}
.moves .what{color:var(--ink-2)}
.moves-title{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3);
 font-family:"IBM Plex Mono",monospace;margin-bottom:2px}
.foot{border-top:1px solid var(--line);margin-top:56px;padding-top:24px;color:var(--ink-3);
 font-size:13.5px;display:flex;flex-wrap:wrap;gap:10px 20px}
.foot .brand{font-family:Archivo,sans-serif;font-weight:600;color:var(--ink)}

.js-anim .rev{opacity:0;transform:translateY(12px);transition:opacity .5s ease,transform .5s cubic-bezier(.2,.7,.3,1)}
.js-anim .rev.in{opacity:1;transform:none}
@media (max-width:900px){.shell{grid-template-columns:1fr;gap:0;margin-top:0}.spine{display:none}
 .col{max-width:none;padding-top:36px}}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.001ms!important;
 transition-duration:.001ms!important}.js-anim .rev{opacity:1;transform:none}}
"""

JS = """
(function(){
 var root=document.documentElement;
 try{
  if(!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches))
    root.classList.add('js-anim');
  var t=document.querySelectorAll('.rev');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},
      {rootMargin:'0px 0px -10% 0px',threshold:.1});
    t.forEach(function(x){io.observe(x);});
  } else { t.forEach(function(x){x.classList.add('in');}); }

  var links=[].slice.call(document.querySelectorAll('.spine a'));
  var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'));});
  function spy(){var best=0;secs.forEach(function(s,i){
    if(s&&s.getBoundingClientRect().top<=130)best=i;});
    links.forEach(function(a,i){a.classList.toggle('active',i===best);});}
  var tick=false;
  window.addEventListener('scroll',function(){if(tick)return;tick=true;
    requestAnimationFrame(function(){spy();tick=false;});},{passive:true});
  spy();

  // only one clip plays at a time
  var vids=[].slice.call(document.querySelectorAll('video'));
  vids.forEach(function(v){v.addEventListener('play',function(){
    vids.forEach(function(o){if(o!==v&&!o.paused)o.pause();});});});
 }catch(e){root.classList.remove('js-anim');}
})();
"""


def clip_html(p):
    c = clips.get(p["id"])
    if c and c.get("url"):
        poster = ' poster="%s"' % html.escape(c["poster"]) if c.get("poster") else ""
        dur = ('<span class="dur">%s</span>' % html.escape(c["duration"])) if c.get("duration") else ""
        return ('<div class="clip"><video controls preload="metadata" playsinline%s>'
                '<source src="%s" type="video/mp4"></video>%s</div>'
                % (poster, html.escape(c["url"]), dur))
    return ('<div class="clip"><div class="pending"><span class="slate"></span>'
            '<b>Clip being recorded</b><span>The walkthrough for this screen '
            'is on its way.</span></div></div>')


def flow_html():
    steps = []
    for i, st in enumerate(flow["steps"], 1):
        moves = "".join(
            '<div class="mv"><span class="where">%s</span><span class="what">%s</span></div>'
            % (html.escape(w), html.escape(t)) for w, t in st["moves"]
        )
        steps.append(
            '<article class="step">'
            '<div class="step-head"><span class="step-n">%02d</span><h3>%s</h3></div>'
            '<p class="blurb" style="padding-left:22px">%s</p>'
            '<div class="step-body"><div><p class="script">%s</p>'
            '<div class="moves"><p class="moves-title">What moves</p>%s</div></div>%s</div>'
            '</article>'
            % (i, html.escape(st["title"]), html.escape(st["blurb"]),
               html.escape(st["script"]), moves, clip_html(st))
        )
    return ('<section class="flowsec rev" id="flow">'
            '<div class="group-head"><p class="eyebrow">%d steps &middot; worked example</p>'
            '<h2>%s</h2><p class="flow-intro">%s</p></div>%s</section>'
            % (len(flow["steps"]), html.escape(flow["title"]),
               html.escape(flow["intro"]), "".join(steps)))


def main():
    by_group = {g: [p for p in pages if p["group"] == g] for g in GROUPS}
    spine_bits = []
    for i, g in enumerate(GROUPS):
        if not by_group[g]:
            continue
        spine_bits.append('<a href="#g%d">%s</a>' % (i, html.escape(g)))
        if g == "Setting up":
            spine_bits.append('<a href="#flow">Start to finish</a>')
    spine = "".join(spine_bits)

    body = []
    for i, g in enumerate(GROUPS):
        items = by_group[g]
        if not items:
            continue
        body.append('<section class="group rev" id="g%d">' % i)
        body.append('<div class="group-head"><p class="eyebrow">%d screen%s</p>'
                    '<h2>%s</h2><p>%s</p></div>'
                    % (len(items), "" if len(items) == 1 else "s",
                       html.escape(g), html.escape(GROUP_NOTE[g])))
        for p in items:
            body.append(
                '<article class="screen">'
                '<div class="s-head"><h3>%s</h3><span class="route">%s</span>'
                '<a class="open" href="https://kablanet.com%s" target="_blank" rel="noopener">Open &rarr;</a></div>'
                '<p class="blurb">%s</p>'
                '<div class="s-body"><p class="script">%s</p>%s</div>'
                '</article>'
                % (html.escape(p["title"]), html.escape(p["route"]), p["route"],
                   html.escape(p["blurb"]), html.escape(p["script"]), clip_html(p))
            )
        body.append('</section>')
        if g == "Setting up":
            body.append(flow_html())

    all_ids = [p["id"] for p in pages] + [s["id"] for s in flow["steps"]]
    ready = sum(1 for i in all_ids if clips.get(i, {}).get("url"))
    total_clips = len(all_ids)
    out = f"""<title>Kablanet Screen by Screen</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap">
<style>{CSS}</style>

<div class="hero"><div class="hero-in">
  <p class="eyebrow">Kablanet &middot; guided tour</p>
  <h1>Every screen, in about half a minute each.</h1>
  <p class="lede">Short walkthroughs of every screen — what it's for, what the numbers mean, and
  the one thing you'll do there most often — plus one worked example that follows a single invoice
  from raising it to getting paid and paying your subs. Watch what you need, skip the rest.</p>
  <div class="hero-meta">
    <span class="pill">{len(pages)} screens</span>
    <span class="pill">{len(flow["steps"])}-step worked example</span>
    <span class="pill">~30 seconds each</span>
    <span class="pill">{ready} of {total_clips} clips ready</span>
  </div>
</div></div>

<div class="shell">
  <nav class="spine" aria-label="Sections"><div class="spine-in">
    <div class="spine-head"><span class="mark">K</span><span>The tour</span></div>
    {spine}
  </div></nav>
  <main class="col">
    {''.join(body)}
    <div class="foot"><span class="brand">Kablanet</span>
    <span>Guided tour &middot; {len(pages)} screens &middot; {len(flow["steps"])}-step example</span>
    <span style="margin-left:auto">Recorded in a demo company &mdash; the figures aren't yours.</span></div>
  </main>
</div>
<script>{JS}</script>
"""
    path = os.path.join(HERE, "kablanet-tour.html")
    open(path, "w").write(out)
    print("wrote %s (%d screens + %d flow steps, %d/%d clips embedded)"
          % (path, len(pages), len(flow["steps"]), ready, total_clips))


if __name__ == "__main__":
    main()
