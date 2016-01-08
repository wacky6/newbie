{%- extends "template.swig" -%}

{%- block meta %}
<meta name="description" content="List of qjw's blog posts">
<meta name="keywords" content="blog, Jiewei Qian, wacky6">
<title>Blogs | Jw.Q</title>
{% endblock -%}

{%- block head %}
<link rel="stylesheet" href="/article.css">
<link rel="stylesheet" href="blog-index.css">
{% endblock -%}

{%- macro articleEntry(m) %}
<li class="post-entry {%- if m.featured %} featured {%- endif -%}" data-date="{{m.date}}" data-title="{{m.title|safe}}" data-keywords="{{m.keywords|join(', ')|safe}}">
	<a title="{{m.description|safe}}" href="{{m.name}}/">
	<h2>{{m.title}}</h2>
	<span class="date">{{m.dateStr}}</span>
	<p>{{m.brief|escape|replace('[\r\n]+', '<br>', 'g')|safe}}</p>
	</a>
</li>
{% endmacro -%}

{%- block body -%}
<article>
<header>
	<h1>Blog Posts</h1>
</header>
<ul class='post-list'>
{%- for _ in articles -%}
	{{- articleEntry(_) -}}
{% endfor %}
</ul>
</article>
{% endblock -%}
