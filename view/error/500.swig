{%- extends "../template.swig" -%}

{%- block head -%}
<title>Oops. Error 500</title>
<meta name="robots" content="noindex, nofollow, noodp, narchive">
<link rel="stylesheet" href="/article.css">
{%- endblock -%}

{%- block body -%}
{%- include "../nav.swig" -%}
<article>
<h1 class="error">Boom! Brain Exploded!</h1>
<p style="white-space: pre;">
Server renderer just get blown up by jwQ's bad coding.
May be jwQ will fix it when he gets enough food. :D
</p>
<hr />
<h1 class="error">页面爆炸啦！</h1>
<p style="white-space: pre;">
代码太烂。处理的时候服务器爆炸啦！
或许我吃饱的时候会尝试修复这个问题
</p>
</article>
{%- endblock -%}
