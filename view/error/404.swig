{%- extends "../template.swig" -%}

{%- block meta %}
<meta name="robots" content="noindex, nofollow, noodp, narchive">
<title>Oops. Error 404</title>
{% endblock -%}

{%- block head %}
<link rel="stylesheet" href="/article.css">
{% endblock -%}

{%- block body -%}
{%- include "../nav.swig" -%}
<article>
<h1 class="error">Oops. Girlfriend not found.</h1>
<p style="white-space: pre;">
Just like I always say:
    jwQ won't find his girlfirend. :D
</p>
<hr />
<h1 class="error">找不到对象</h1>
<p style="white-space: pre;">
活该找不到对象 :D
</p>
</article>
{%- endblock -%}
