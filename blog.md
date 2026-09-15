---
layout: page
title: Blog
permalink: /blog/
---

{% if site.posts.size > 0 %}
<ol class="post-list">
  {%- for post in site.posts %}
  <li class="post-item reveal" style="--i: {{ forloop.index0 }}">
    <p class="post-date"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d, %Y" }}</time></p>
    <div class="post-body">
      <h2 class="post-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p class="post-excerpt">{% if post.tldr %}{{ post.tldr }}{% else %}{{ post.excerpt | strip_html | truncate: 170 }}{% endif %}</p>
    </div>
  </li>
  {%- endfor %}
</ol>
{% else %}
<p class="empty-state">Nothing published here yet. Writing lands on this page first.</p>
{% endif %}
