{# static, about/index.html #}
{%- extends "template.swig" -%}

{%- block head -%}
<meta name="description" content="About Jiewei Qian; Now a student at NJUPT; used ID includes: wacky6, std::weak">
<meta name="keywords" content="Jiewei Qian, wacky6, about, biography">
<title>About me @ std-aries</title>
<link rel="stylesheet" href="/article.css">
<link rel="stylesheet" href="/about/about.css">
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Person",
  "name": "Jiewei Qian",
  "gender": "Male",
  "birthDate": "1995-04-18",
  "birthPlace": {
    "@type": "City",
    "name": "Nanjing"
  },
  "jobTitle": "Student",
  "email": "mailto:wacky6@qq.com",
  "url": "https://std-aries.xyz/",
  "nationality": {
    "@type": "Country",
    "name":  "China"
  },
  "affiliation": {
    "@type": "CollegeOrUniversity",
    "name":  "Nanjing University of Posts and Telecommunications",
    "alternateName": "南京邮电大学",
    "sameAs": "http://www.njupt.edu.cn/"
  },
  "memberOf": {
    "@type": "Organization",
    "name":  "NJUPT Science Association of Computer College",
    "sameAs": "http://www.nuptsacc.com"
  },
  "alumniOf": {
    "@type": "HighSchool",
    "name":  "High School Affiliated to Nanjing Normal University",
    "alternateName": "南京师范大学附属中学",
    "sameAs": "http://www.nsfz.net/"
  }
}
</script>
{%- endblock -%}
{%- block body -%}
{%- include "nav.swig" -%}
<article>
<header>
<h1>About Me</h1>
</header>
<section class="bio">
<h2>Simple Facts</h2>
<p>
1995.4 born <strong style="color:#84dcff">@Aries</strong>, now a college student <br>
Sometime <strong style="color:#dd94ff">{Perfectionist, Paranoid}</strong> <br>
<strong style="color:#71ff96">Gadget Lover</strong> <br>
Ocassionally shoot photos, <strong style="color:#05c0ff">PS addictive</strong> <br>
<strong style="color:#ffd605">Single</strong>, and <strong style="color:#ff261c">can't</strong> find girlfirend <br>
<strong style="color:#39ffb7">Game</strong>, <strong style="color:#f4b8ff">Anime</strong>, <strong style="color:#88acff">Technology</strong> (Partial OTAKU) <br>
Made in <strong style="color:#84dcff">Nanjing, PRC</strong> <br>
</p>
</section>
<section class="edu" id="sec_edu">
<h2>Education &amp; Experience</h2>

{% macro bgimg(url -%}
<div class="bg" style="background-image: url('{{url}}');" > </div>
{%- endmacro -%}

<div class="detail">
{{ bgimg("/about/edu3.jpg") -}}
<h3 class="current">Nanjing University of Posts and Telecommunications</h3>
<p>
Entered NJUPT @ 2013, partially due to a College-Entrance-Exam failure<br>
Website: <a rel="external" title="Nanjing University of Posts and Telecommunications" href="http://www.njupt.edu.cn/">NJUPT</a>
</p>
<p>
Major in <em>Software Engineering</em> <br>
Member of <a rel="external" title="NJUPT Science Association of Computer College" href="http://www.nuptsacc.com">NUPTSACC</a> <br>
PM of STITP project: <em>Smart Home Middleware</em> <br>
</p>
<p>
Published album <em><a rel="external" href="http://photo.renren.com/photo/335657284/album-929131365/v7" title="Love in NSFZ">Love in NSFZ / 爱在附中</a></em>(requires registration)
, well accepted by alumni.
</p>
<h5>Did some cool stuff:</h5>
<ul>
  <li>Deployed Gentoo on <a rel="external" title="Cubietruck is a Chinese made ARMv7 SBC" href="http://linux-sunxi.org/Cubietech_Cubietruck">Cubietruck</a>, used as server (DDNS)</li>
  <li>Deployed personal cloud: Media share, Netdisk, Remote Access(SSH, VPN)</li>
  <li>Host this website on <a rel="external" title="Conoha VPS" href="https://www.conoha.jp/referral/?token=RdXdLxPKsfXTCpAfmhm2Usn7IHQ0zGFeCU_Bqa61GExDdPduxDc-72R" title="Conoha.jp">conoha</a></li>
</ul>
</div>

<div class="detail">
{{ bgimg("/about/edu4.jpg") -}}
<h3>As Exchange Student, Nanjing University</h3>
<p>
Exchange student program: <em>Software Institute, Nanjing University</em>, 2014-2015 1st Semester
</p>
<h5>Projects:</h5>
<ul class="project-list">
  <li class="team">
    <h4>Sales Management System</h4>
    <p>
    Java, exercise entire workflow of software development<br>
    Experience with SVN, as a team cooperation tool
    </p>
  </li>
  <li class="team">
    <h4>Web Spider (robot)</h4>
    <p>
    node.js, Data Structure Course, off-class project<br>
    No framework used, finds out webpage popularity in nju.edu.cn<br>
    Soon, Spider gets blacklisted, NJU strengthens server filter policy.<br>
  </li>
  <li class="solo">
    <h4>Online Dictionary</h4>
    <p>Jave programming principles, Spring UI design</p>
  </li>
</ul>
</div>

<div class="detail">
{{ bgimg("/about/edu2.jpg") -}}
<h3>High School Affiliated to Nanjing Normal University</h3>
<span style="display:block; color:#fffc00;">Most Wonderful and Amazing Years as a Student. Best of All time.</span>
<p>
One of the top high schools in Nanjing, dates back to 1902.<br/>
Website: <a rel="external" href="http://www.nsfz.net/">南京师范大学附属中学</a>
</p>
<p>
Become more engaged in Coding, Self-taught C/C++
</p>
<h5>Wrote some nasty programs</h5>
<ul>
  <li>remote control      <strong class="reality">(read: Torjan)</strong> </li>
  <li>thumbdrive scraper  <strong class="reality">(read: file stoler)</strong> </li>
  <li>remote monitor      <strong class="reality">(read: hentai)</strong> </li>
</ul>
<h5>As member of 'NO AUTO Photography Association'</h5>
<ul>
  <li>Play cameras with little buddies (lots of fun)</li>
  <li>Take snapshots <strong class="reality">(blacken little buddies)</strong> during events</li>
  <li>Canon Photography Contest, China, 2013, Professional Group, <em>Honorable Mention</em></li>
  <li>Several photos archived in Graduation Memorial</li>
</ul>
<p>
Meet bilibili, begin to enjoy kichiku videos<br>
Troubleshoot/fix many computer related issues for classmates &amp; teachers
</p>
</div>

<div class="detail">
{{ bgimg("/about/edu1.jpg") -}}
<h3>Nanjing Shuren International School</h3>
<p>
Website: <a rel="external" href="http://www.nsfzsr.com/">南师附中树人学校</a> <br>
Originally a private school, turned public in 2013.<br>
Official name now is: High School Affiliated to Nanjing Normal University Shuren Campus.
</p>
<p>
This is where I first learn to code seriously. (Pascal) (I've learnt BASIC at age of 10)<br>
Self-taught Delphi, <a rel="external" href="http://lazarus-ide.org/" title="Nostalgic Lazarus">Lazarus</a>
</p>
</div>

</section>
<section class="site">
<h2>About this site</h2>
<p>You are reading this site thanks to many great <strong>open-source</strong> projects</p>
{%- macro href_icon(title, href, iconUrl) -%}
<a href="{{href}}" style="background-image: url('{{iconUrl}}');">
{%- if title -%}
<span>{{title}}</span>
{%- endif -%}
</a>
{%- endmacro -%}
<div class="float-container">
{{ href_icon("node.js", "https://nodejs.org/",
  "node.svg" ) }}
{{- href_icon("Linux", "https://en.wikipedia.org/wiki/Linux",
  "linux.png" ) }}
{{- href_icon("git",   "http://www.git-scm.com/",
  "git-scm.png" ) }}
{{- href_icon("vanilla.js", "http://vanilla-js.com",
  "vanillajs.png") }}
{{- href_icon("", "https://developer.mozilla.org/",
  "MDN_promo.png") }}
</div>

<a rel="external" href="http://youmightnotneedjquery.com/" title="Why NOT jQuery? You don't need it!" class="block-link">
No framework, Proudly! <br>
<b>自豪地</b>不使用框架
</a>

<a rel="external" href="https://wellfire.co/learn/why-we-dont-use-wordpress/" title="Why Not Wordpress, just a link placeholder." class="block-link">
No template, Hand-coded! <br>
<b>自豪地</b>用手敲代码
</a>

</section>
<section class="etc">
<h2>Et cetera</h2>
<p>
HSTS is now <b style="color:red">enforced</b>, with a free certificate from StartCom<br>
You are welcomed to sponsor a commercial one.
</p>
<p>http/2 by default, feel free to experiment with it! :D</p>
<p>
Site does <b style="color:red">NOT</b> support: <code>'IE&lt;11, OEM, terminal, App embedded browsers'</code> <br>
Site SHOULD support: <code>'market &gt; 5%, last 2 versions'</code> <br>
If you are certain there's a BUG, send a description to
<a href='mailto: webmaster@std-aries.xyz'>webmaster@std-aries.xyz</a>
</p>
</section>
</article>
<script>
var gradualFadeInInterval = 500;
function injectGradualFadeInDelay(elements, interval) {
    forEachIn(elements, function(e,i){
        var ms = i*interval+"ms";
        e.style['-webkit-animation-delay'] = ms;
        e.style['animation-delay']         = ms;
    });
}
window.addEventListener('DOMContentLoaded', injectGradualFadeInDelay.call(undefined, $$("section"), 500));
</script>
{%- endblock -%}
