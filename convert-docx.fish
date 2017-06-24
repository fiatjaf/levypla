for docx in (find . -name "*.docx")
  # generate an html file from the .docx
  set html5 (string split '.docx' "$docx" | tail -n 2 | head -n 1).html
  pandoc -f docx -t html5 -o "$html5" "$docx"

  # set the generated document date to be equal to the .docx date
  set gitdate (git log --pretty=format:%aI -- "$docx" | tail -n 1)
  touch -d "$gitdate" "$html5"
end
