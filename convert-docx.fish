for docx in (find . -name "*.docx")
  set html5 (string split '.docx' "$docx" | tail -n 2 | head -n 1).html
  echo "turning '$docx' into '$html5'"

  # generate an html file from the .docx
  pandoc -f docx -t html5 -o "$html5" "$docx"

  # set the generated document date to be equal to the .docx date
  set gitdate (git log --pretty=format:%aI -- "$docx" | tail -n 1)
  if [ "$gitdate" ]
    touch -d "$gitdate" "$html5"
    echo "  ~ set file date to '$gitdate' (from git)."
  else
    echo "  ~ couldn't read date from git."
  end

  # grab other properties from .docx and set them as the html metadata
  unzip -o "$docx" -d /tmp/docx > /dev/null 2>&1
  if [ -d /tmp/docx/docProps -a -e /tmp/docx/docProps/core.xml ]
    echo "  ~ reading metadata from docx xml."
    set title (./xidel /tmp/docx/docProps/core.xml --extract='<title>{.}</title>' 2>/dev/null)
    set creator (./xidel /tmp/docx/docProps/core.xml --extract='<creator>{.}</creator>' 2>/dev/null)
    set modified (./xidel /tmp/docx/docProps/core.xml --extract='<modified>{.}</modified>' 2>/dev/null)
    set created (./xidel /tmp/docx/docProps/core.xml --extract='<created>{.}</created>' 2>/dev/null)
    set summary (./xidel /tmp/docx/docProps/core.xml --extract='<summary>{.}</summary>' 2>/dev/null)
    set date (./xidel /tmp/docx/docProps/core.xml --extract='<date>{.}</date>' 2>/dev/null)
    set revision (./xidel /tmp/docx/docProps/core.xml --extract='<revision>{.}</revision>' 2>/dev/null)
    # ~
    echo "---" > /tmp/frontmatter
    if [ -n "$title" ]
      echo "title: $title" >> /tmp/frontmatter
    end
    if [ -n "$modified" ]
      echo "modified: $modified" >> /tmp/frontmatter
    end
    if [ -n "$created" ]
      echo "created: $created" >> /tmp/frontmatter
    end
    if [ -n "$summary" ]
      echo "summary: $summary" >> /tmp/frontmatter
    end
    if [ -n "$date" ]
      echo "date: $date" >> /tmp/frontmatter
    end
    if [ -n "$revision" ]
      echo "revision: $revision" >> /tmp/frontmatter
    end
    echo "---" >> /tmp/frontmatter
    echo "" >> /tmp/frontmatter
    cat /tmp/frontmatter "$html5" > /tmp/html
    mv /tmp/html "$html5"
    rm -r /tmp/frontmatter /tmp/docx
  else
    echo "  ~ couldn't read metadata."
  end
end
