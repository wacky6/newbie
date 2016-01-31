{# nav bar for normal page #}

<nav class="side left">
    <div class="valign">
        <a class="index" title="Homepage" rel="index" href="/">
            <i class="icon-home"></i>
            <span>Index</span>
        </a>
        <a class="blog"  title="Blog posts" href="/Blog/">
            <i class="icon-th-list"></i>
            <span>Blog</span>
        </a>
        <a class="about" title="About me"   href="/About/">
            <i class="icon-user"></i>
            <span>About</span>
        </a>
        {%- block nav_btn -%}
        {%- endblock -%}
    </div>
</nav>
