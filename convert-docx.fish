for docx in (find . -name "*.docx")
  set html5 (string split '.docx' "$docx" | tail -n 2 | head -n 1).html
  pandoc -f docx -t html5 -o "$html5" "$docx"
end
