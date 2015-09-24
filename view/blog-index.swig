{%- extends "template.swig" -%}

{%- block head %}
<meta name="description" content="List of qjw's blog posts">
<meta name="keywords" content="blog, Jiewei Qian, wacky6,">
<title>Blogs @ std-aries</title>
<link rel="stylesheet" href="/article.css">
<link rel="stylesheet" href="blog-index.css">
{% endblock -%}

{%- macro articleEntry(m) -%}
<li class="post-entry {% if m.featured %}featured{% endif %}" data-date="{{m.date}}" data-title="{{m.title|safe}}" data-keywords="{{m.keywords|join(', ')|safe}}">
	<a title="{{m.description|safe}}" href="{{m.href}}">
	<h2>{{m.title}}</h2>
	<span class="date">{{m.date|dateFormat}}</span>
	<p>{{m.brief|escape|replace('[\r\n]+', '<br>')|safe}}</p>
	</a>
</li>
{%- endmacro -%}

{%- block body -%}
{%- include "nav.swig" -%}
<article>
<header>
	<h1>Blog</h1>
</header>
<ul class='post-list'>
{%- for _ in articles %}
	{{- articleEntry(_) -}}
{% endfor -%}
</ul>
</article>
{%- endblock -%}