setTimeout(() => {
    
    var text = document.getElementById('output')
     var op = document.getElementById('option')
     var user = prompt('>>>')

     function clear(){
         op.remove()
     }
     String.prototype.replaceAt = function(index, replacement) {
        if (index >= this.length) {
            return this.valueOf();
        }
    
        var chars = this.split('');
        chars[index] = replacement;
        return chars.join('');
    }
     function authorsTagging(names){
         var authorNames = names
         var tagged = []
         var etal = 0
         authorNames = authorNames.replaceAll(' ,', ',')
         authorNames = authorNames.replaceAll(';', ',')
         var nameList = authorNames.split(' ')
         for (let i = 0; i < nameList.length; i++) {
             
             if (nameList[i].toString().includes(',')){
                 if(nameList[i][nameList[i].toString().length - 2] == nameList[i][nameList[i].toString().length - 2].toLowerCase() && nameList[i][nameList[i].toString().length - 2] !== '.'){
                      nameList[i] = nameList[i].replace(',','')
                 }else{
                     nameList[i] = nameList[i].replace(',','#')
                 }
             }
         }
         var nameList = nameList.toString().replaceAll(',',' ').replaceAll('#',',').split(',')
         for (let i = 0; i < nameList.length; i++) {
             if (nameList[i] == ''){
                 nameList.splice(i)
             }
         }
         for (let i = 0; i < nameList.length; i++){
             var etal = etal + 1
             var surname = []
             var givennames = []
             var author = nameList[i].trim().split(' ')
             for (let x = 0; x < author.length; x++){
                 if(author[x].length > 1){
                     if (author[x][0] == author[x][0].toLowerCase() && author[x][1] == author[x][1].toLowerCase() && author[x][1] != '.'){
                         surname.push(author[x])
                     } else if (author[x][0] == author[x][0].toUpperCase() && author[x][1] == author[x][1].toLowerCase() && author[x][1] != '.' && author[x][1] != '-'){
                         surname.push(author[x])
                     } else if (author[x][0] == author[x][0].toUpperCase() && author[x][1] == '.'){
                         givennames.push(author[x])
                         
                     } else if (author[x][0] == author[x][0].toUpperCase() &&  author[x][1] == '-'){
                         givennames.push(author[x])
                         
                     } else if (author[x][0] == author[x][0].toUpperCase() && author[x][1] == author[x][1].toUpperCase()){
                         givennames.push(author[x])
                         
                     }
                 } else if (author[x].length == 1 && author[x][0] == author[x][0].toUpperCase()){
                     givennames.push(author[x])
                     
                 }
             }
             tagging(surname,givennames)
         }
         function tagging(surname,givennames){
             var surname = surname.toString()
             var givennames = givennames.toString()
             for (let x = 0; x < surname.split('').length; x++) {
                if(surname[x] == ',' && surname[x-1] == surname[x-1].toLowerCase()){
                    surname = surname.replaceAt(x, ' ')
                }
                
            }
             tagged.push(`<name><surname>${surname.replace(',',' ')}</surname> <given-names>${givennames.replace(',',' ')}</given-names></name>`)
         }
         if (etal >= 6){
             var etal = `<etal/>`
         }else{
             var etal = ''
         }
         var done = `${tagged.toString().replaceAll(',', '')}${etal}`
         for (let i = 0; i < done.length; i++) {
             for (let x = 0; x < character.length; x++) {
                 if(done[i] == character[x].letter){
                     done = done.replace(done[i], character[x].int)
                 } else if (done[i] == character[x].letter.toLowerCase()){
                     done = done.replace(done[i], character[x].int.toLowerCase())
                 }
                 
                 
             }
         }
         text.append(done)
         clear()
     }
 
     function doi(){
         var userInput = prompt('DOI >>> ')
         var output = ''
         if (userInput.includes('#doi:') || userInput.includes('doi:') || userInput.includes('DOI:') || userInput.includes('#DOI:')){
             var userInput = userInput.split(':')
             var output = `${userInput[1].trim()}`
         }else{
             var output = userInput
         }
         text.append(`doi:&nbsp;<pub-id pub-id-type="doi">${output}</pub-id>`)
         clear()
     }
 
     function URI(){
         var userInput = prompt('Link >>> ')
         var http = ''
         if (!userInput.includes('http')){
             http = 'https://'
         }
         var doiTag =  `<uri xlink:href="${http}${userInput}">${http}${userInput}</uri>`
         text.append(doiTag)
         clear()
     }
 
     function Page(){
        pageType = prompt('Page-range(0), Fpage&Lpage(1), elocation(2)')
        userInput = prompt('Page>> ')
        userInput = userInput.replaceAll(' ', '')
        dash = ''
       for (let i = 0; i < userInput.length; i++) {
          if(userInput[i] == '-' || userInput[i] == '—' || userInput[i] == '_'){
              dash = userInput[i]
          }
      }
        number = userInput.split(dash) 
        xpage = number[0]
        ypage = number[1]
       if (pageType == '0'){
           if(xpage.length == ypage.length){
               for (let i = 0; i < xpage.length; i++) {
                   if(xpage[i] != ypage[i]){
                       text.append(`<page-range>${xpage}&ndash;${ypage.replace(ypage.substring(0,i), '')}</page-range>`)
                       break
                   }
               }
           }else{
               text.append(`<page-range>${number[0]}&ndash;${number[1]}</page-range>`)
           }
           
       } else if (pageType == '1'){
           text.append(`<fpage>${number[0]}</fpage>&ndash;<lpage>${number[1]}</lpage>`)
       } else if(pageType == '2'){
            text.append(`<elocation-id>${userInput}</elocation-id>`)
       }
       clear()
   }
 
     function titleCase(){
         var userInput = prompt('Article title>>>')
         var title = userInput.toTitleCase().split(' ')
         for (let i = 0; i < title.length; i++) { 
             if (title[i].includes(',')){
                 title[i] = title[i].replaceAll(',','#')
             }
             if (title[i][0] == '&'){
                 title[i] = title[i].toLowerCase()
             }   
         }
         text.append(title.toString().replaceAll(',',' ').replaceAll('#',','))
         clear()
     }
 
     function loopLink(){
         var userInput = prompt('Loop link>>>')
         text.append(`<uri xlink:href="${userInput}"/>`)
         clear()
     }
     function Volume_Issue(){
         var userInput = prompt('Volume&Issue >>')
         function insertAt(array, index, ...elements) {
             array.splice(index, 0, ...elements);
         }
         var split = userInput.replace('(', '#(').split('#')
         var volume = split[0].split('')
         source = split[1].split('')
         insertAt(volume, 0, '<volume>')
         insertAt(volume, volume.length, '</volume>')
         insertAt(source, 1, '<issue>')
         insertAt(source, source.length - 1, '</issue>')
         var volume = volume.toString().replaceAll(',', '')
         var source = source.toString().replaceAll(',', '')
         text.append(`${volume}${source}`)
         clear()
     }
 
     function lowercase(){
         var userInput = prompt('Title>>>')
         var output = userInput.toLowerCase()
         text.append(output)
         clear()
     }
 
     function unicode() {
         var userInput = prompt('Character>>>')
         for (let i = 0; i < userInput.length; i++) {
             for (let x = 0; x < character.length; x++) {
                 if(userInput[i] == character[x].letter){
                     userInput = userInput.replace(userInput[i], character[x].int)
                 } else if (userInput[i] == character[x].letter.toLowerCase()){
                     userInput = userInput.replace(userInput[i], character[x].int.toLowerCase())
                 }
             }
         }
         text.append(userInput)
         clear()
     }

     function difFormat(names) {
        console.log('s')
        author = names
        nameList = author.replaceAll(',','').split(' ')
        run = 0
        authors = []
        test = []


        for (let i = 0; i < nameList.length; i++) {
            
            function push(name, run){
                
                console.log(run)
                if(run == name.length){
                    authors.unshift(name)
                }
                if(run == -Math.abs(name.length)){
                    authors.unshift(name)
                }
            }
            
            console.log(nameList)
            for (let x = 0; x < nameList[i].length; x++) {
                // surnames
                console.log(nameList[i])
                if(nameList[i].length == 3){
                    if(nameList[i][0] == nameList[i][0].toLowerCase() && nameList[i][1] == nameList[i][1].toLowerCase() && nameList[i][2] == nameList[i][2].toLowerCase()){
                        run++
                        push(nameList[i], run)
                    }
                }
                if(nameList[i].length > 1){
                    if (nameList[i][0] == nameList[i][0].toUpperCase() && nameList[i][1] == nameList[i][1].toLowerCase() && nameList[i][1] !== '.' && nameList[i][1] !== '-'){
                        run++
                        push(nameList[i], run)
                    }
                }
                console.log(nameList)

                //givennames
                
                if(nameList[i].length == 1){
                    if(nameList[i][0] == nameList[i][0].toUpperCase()){
                        console.log(nameList[i])
                        run--
                        push(nameList[i], run)
                    }
                }else if (nameList[i].length > 1){
                    if(nameList[i][0] == nameList[i][0].toUpperCase() && nameList[i][1] == '.'){
                        run--
                        push(nameList[i], run)
                    }else if (nameList[i][0] == nameList[i][0].toUpperCase() && nameList[i][1] == nameList[i][1].toUpperCase()){
                        run--
                        push(nameList[i], run)
                    } else if (nameList[i][0] == nameList[i][0].toUpperCase() && nameList[i][-1] == '.'){
                        run--
                        push(nameList[i], run)
                    } else if (nameList[i][0] == nameList[i][0].toUpperCase() && nameList[i][1] == '-'){
                        run--
                        push(nameList[i], run)
                    }
                }
            }
            run = 0
        }

        
        authors = authors.toString()
        authors = authors.split(',')
        authors = authors.toString().replaceAll(',',', ')
        for (let n = 0; n < authors.length; n++) {
            if(authors[n] == ','){
                if(authors[n-1] == authors[n-1].toLowerCase() && authors[n-1] !== '.'){
                    authors = authors.replaceAt(n, '')
                }
            }
        }
        authors = authors.split(',').reverse()
        authors = authors.toString().replaceAll(',',', ').replaceAll('  ', ' ')
        authorsTagging(authors)
     }

        function numberedCitation(){
            userInput = prompt('Ref Citation>> ')
            output = []
            if(userInput.includes('-') && userInput.includes(',')){
                tag(userInput,3) 
            }else if(userInput.includes(',')){
            userInput = userInput.replaceAll(' ','').split(',')
            tag(userInput,1)
            }else if(userInput.includes('-')){
                tag(userInput,2)
            }else{
                tag(userInput,0)
            }


            function tag(userInput, type){
                if(type == 0){
                    output = `<xref ref-type="bibr" rid="B${userInput}">${userInput}</xref>`
                }
                if(type == 1){
                    for (let i = 0; i < userInput.length; i++) {
                        output.push(`<xref ref-type="bibr" rid="B${userInput[i]}">${userInput[i]}</xref>`)
                    }
                    output = output.toString().replaceAll(',', ', ')
                }else if(type == 2){
                    userInput = userInput.replaceAll(' ','').split('-')
                    output = `<xref ref-type="bibr" rid="B${userInput[0]}">${userInput[0]}</xref>&ndash;<xref ref-type="bibr" rid="B${userInput[1]}">${userInput[1]}</xref>`
                }else if(type == 3){
                    userInput = userInput.replaceAll(' ','').split(',')
                    for (let x = 0; x < userInput.length; x++) {
                        if(userInput[x].includes('-')){
                            userInput[x] = userInput[x].split('-')
                            output.push(`<xref ref-type="bibr" rid="B${userInput[x][0]}">${userInput[x][0]}</xref>&ndash;<xref ref-type="bibr" rid="B${userInput[x][1]}">${userInput[x][1]}</xref>`)
                        }else{
                            output.push(`<xref ref-type="bibr" rid="B${userInput[x]}">${userInput[x]}</xref>`)
                        }
                    }
                }
            output = output.toString().replaceAll(',', ', ')
            text.append(output)
            clear()
            }
        }

        function removeBold(){
            userInput = prompt('XML>> ')
            userInput = userInput.replaceAll('<?A3B2 show [bold]?><bold>Figures', '<bold>Figures')
            userInput = userInput.replaceAll('<bold>Figures', '<?A3B2 show [bold]?><bold>Figures')
            userInput = userInput.replaceAll('<?A3B2 show [bold]?><bold>Figure', '<bold>Figure')
            userInput = userInput.replaceAll('<bold>Figure', '<?A3B2 show [bold]?><bold>Figure')
            userInput = userInput.replaceAll('<?A3B2 show [bold]?><bold>Tables', '<bold>Tables')
            userInput = userInput.replaceAll('<?A3B2 show [bold]?><bold>Tables', '<bold>Tables')
            userInput = userInput.replaceAll('<bold>Tables', '<?A3B2 show [bold]?><bold>Tables')
            userInput = userInput.replaceAll('<?A3B2 show [bold]?><bold>Table', '<bold>Table')
            userInput = userInput.replaceAll('<bold>Table', '<?A3B2 show [bold]?><bold>Table')
            userInput = userInput.replaceAll('<?A3B2 show [bold]?><bold>Supplementary', '<bold>Supplementary')
            userInput = userInput.replaceAll('<bold>Supplementary', '<?A3B2 show [bold]?><bold>Supplementary')
            userInput = userInput.replaceAll('<?A3B2 show [bold]?><bold>Supplemental', '<bold>Supplemental')
            userInput = userInput.replaceAll('<bold>Supplemental', '<?A3B2 show [bold]?><bold>Supplemental')
            userInput = userInput.replaceAll('<?A3B2 show [bold]?><bold>Appendix', '<bold>Appendix')
            userInput = userInput.replaceAll('<bold>Appendix', '<?A3B2 show [bold]?><bold>Appendix')
            userInput = userInput.replaceAll('</bold></xref>', '</bold><?A3B2 show [/bold]?></xref>')
            text.append(userInput)
            clear()
        }
 
     var character = [
        {letter: 'À', int: '&Agrave;'},
        {letter: 'Á', int: '&Aacute;'},
        {letter: 'Â', int: '&Acirc;'},
        {letter: 'Ã', int: '&Atilde;'},
        {letter: 'Ä', int: '&Auml;'},
        {letter: 'Å', int: '&Aring;'},
        {letter: 'Æ', int: '&AElig;'},
        {letter: 'Ç', int: '&Ccedil;'},
        {letter: 'È', int: '&Egrave;'},
        {letter: 'É', int: '&Eacute;'},
        {letter: 'Ê', int: '&Ecirc;'},
        {letter: 'Ë', int: '&Euml;'},
        {letter: 'Ì', int: '&Igrave;'},
        {letter: 'Í', int: '&Iacute;'},
        {letter: 'Î', int: '&Icirc;'},
        {letter: 'Ï', int: '&Iuml;'},
        {letter: 'Ð', int: '&ETH;'},
        {letter: 'Ñ', int: '&Ntilde;'},
        {letter: 'Ò', int: '&Ograve;'},
        {letter: 'Ó', int: '&Oacute;'},
        {letter: 'Ô', int: '&Ocirc;'},
        {letter: 'Õ', int: '&Otilde;'},
        {letter: 'Ö', int: '&Ouml;'},
        {letter: 'Ø', int: '&Oslash;'},
        {letter: 'Ù', int: '&Ugrave;'},
        {letter: 'Ú', int: '&Uacute;'},
        {letter: 'Û', int: '&Ucirc;'},
        {letter: 'Ü', int: '&Uuml;'},
        {letter: 'Ý', int: '&Yacute;'},
        {letter: 'Þ', int: '&THORN;'},
        {letter: 'ß', int: '&szlig;'},
        {letter: 'Ç', int: '&Ccedil;'},
        {letter: 'Ñ', int: '&Ntilde;'},
        {letter: 'Γ', int: '&Gamma;'},
        {letter: 'Δ', int: '&Delta;'},
        {letter: 'Σ', int: '&Sigma;'},
        {letter: 'Φ', int: '&Phi;'},
        {letter: 'Ω', int: '&Omega;'},
        {letter: 'α', int: '&alpha;'},
        {letter: 'β', int: '&beta;'},
        {letter: 'γ', int: '&gamma;'},
        {letter: 'δ', int: '&delta;'},
        {letter: 'ε', int: '&epsilon;'},
        {letter: 'ζ', int: '&zeta;'},
        {letter: 'η', int: '&eta;'},
        {letter: 'θ', int: '&theta;'},
        {letter: 'ι', int: '&iota;'},
        {letter: 'κ', int: '&kappa;'},
        {letter: 'λ', int: '&lambda;'},
        {letter: '‚', int: '&sbquo;'},
        {letter: '“', int: '&ldquo;'},
        {letter: '”', int: '&rdquo;'},
        {letter: '„', int: '&bdquo;'},
        {letter: '†', int: '&dagger;'},
        {letter: '‡', int: '&Dagger;'},
        {letter: '•', int: '&bull;'},
        {letter: '…', int: '&hellip;'},
        {letter: '‰', int: '&permil;'},
        {letter: '′', int: '&prime;'},
        {letter: '″', int: '&Prime;'},
        {letter: 'Ć', int: '&Cacute;'},
        {letter: 'Ĉ', int: '&Ccirc;'},
        {letter: 'Ċ', int: '&Cdot;'},
        {letter: 'Č', int: '&Ccaron;'},
        {letter: 'Ď', int: '&Dcaron;'},
        {letter: 'ď', int: '&dcaron;'},
        {letter: 'Đ', int: '&Dstrok;'},
        {letter: 'đ', int: '&dstrok;'},
        {letter: 'Ē', int: '&Emacr;'},
        {letter: 'ē', int: '&emacr;'},
        {letter: 'Ė', int: '&Edot;'},
        {letter: 'ė', int: '&edot;'},
        {letter: 'Ę', int: '&Eogon;'},
        {letter: 'ę', int: '&eogon;'},
        {letter: 'Ě', int: '&Ecaron;'},
        {letter: 'ě', int: '&ecaron;'},
        {letter: 'Ĝ', int: '&Gcirc;'},
        {letter: 'ĝ', int: '&gcirc;'},
        {letter: 'Ğ', int: '&Gbreve;'},
        {letter: 'ğ', int: '&gbreve;'},
        {letter: 'Ġ', int: '&Gdot;'},
        {letter: 'ġ', int: '&gdot;'},
        {letter: 'Ģ', int: '&Gcedil;'},
        {letter: 'Ĥ', int: '&Hcirc;'},
        {letter: 'ĥ', int: '&hcirc;'},
        {letter: 'Ħ', int: '&Hstrok;'},
        {letter: 'ħ', int: '&hstrok;'},
        {letter: 'Ĩ', int: '&Itilde;'},
        {letter: 'ĩ', int: '&itilde;'},
        {letter: 'Ī', int: '&Imacr;'},
        {letter: 'ī', int: '&imacr;'},
        {letter: 'Į', int: '&Iogon;'},
        {letter: 'į', int: '&iogon;'},
        {letter: 'İ', int: '&Idot;'},
        {letter: 'ı', int: '&imath;'},
        {letter: 'Ĳ', int: '&IJlig;'},
        {letter: 'ĳ', int: '&ijlig;'},
        {letter: 'Ĵ', int: '&Jcirc;'},
        {letter: 'ĵ', int: '&jcirc;'},
        {letter: 'Ķ', int: '&Kcedil;'},
        {letter: 'ķ', int: '&kcedil;'},
        {letter: 'ĸ', int: '&kgreen;'},
        {letter: 'Ĺ', int: '&Lacute;'},
        {letter: 'ĺ', int: '&lacute;'},
        {letter: 'Ļ', int: '&Lcedil;'},
        {letter: 'ļ', int: '&lcedil;'},
        {letter: 'Ľ', int: '&Lcaron;'},
        {letter: 'ľ', int: '&lcaron;'},
        {letter: 'Ŀ', int: '&Lmidot;'},
        {letter: 'ŀ', int: '&lmidot;'},
        {letter: 'Ł', int: '&Lstrok;'},
        {letter: 'ł', int: '&lstrok;'},
        {letter: 'Ń', int: '&Nacute;'},
        {letter: 'ń', int: '&nacute;'},
        {letter: 'Ņ', int: '&Ncedil;'},
        {letter: 'ņ', int: '&ncedil;'},
        {letter: 'Ň', int: '&Ncaron;'},
        {letter: 'ň', int: '&ncaron;'},
        {letter: 'ŉ', int: '&napos;'},
        {letter: 'Ŋ', int: '&ENG;'},
        {letter: 'ŋ', int: '&eng;'},
        {letter: 'Ō', int: '&Omacr;'},
        {letter: 'ō', int: '&omacr;'},
        {letter: 'Ő', int: '&Odblac;'},
        {letter: 'ő', int: '&odblac;'},
        {letter: 'Œ', int: '&OElig;'},
        {letter: 'œ', int: '&oelig;'},
        {letter: 'Ŕ', int: '&Racute;'},
        {letter: 'ŕ', int: '&racute;'},
        {letter: 'Ŗ', int: '&Rcedil;'},
        {letter: 'ŗ', int: '&rcedil;'},
        {letter: 'Ř', int: '&Rcaron;'},
        {letter: 'ř', int: '&rcaron;'},
        {letter: 'Ś', int: '&Sacute;'},
        {letter: 'ś', int: '&sacute;'},
        {letter: 'Ŝ', int: '&Scirc;'},
        {letter: 'ŝ', int: '&scirc;'},
        {letter: 'Ş', int: '&Scedil;'},
        {letter: 'ş', int: '&scedil;'},
        {letter: 'Š', int: '&Scaron;'},
        {letter: 'š', int: '&scaron;'},
        {letter: 'Ţ', int: '&Tcedil;'},
        {letter: 'ţ', int: '&tcedil;'},
        {letter: 'Ť', int: '&Tcaron;'},
        {letter: 'ť', int: '&tcaron;'},
        {letter: 'Ŧ', int: '&Tstrok;'},
        {letter: 'ŧ', int: '&tstrok;'},
        {letter: 'Ũ', int: '&Utilde;'},
        {letter: 'ũ', int: '&utilde;'},
        {letter: 'Ū', int: '&Umacr;'},
        {letter: 'ū', int: '&umacr;'},
        {letter: 'Ŭ', int: '&Ubreve;'},
        {letter: 'ŭ', int: '&ubreve;'},
        {letter: 'Ů', int: '&Uring;'},
        {letter: 'ů', int: '&uring;'},
        {letter: 'Ű', int: '&Udblac;'},
        {letter: 'ű', int: '&udblac;'},
        {letter: 'Ų', int: '&Uogon;'},
        {letter: 'ų', int: '&uogon;'},
        {letter: 'Ŵ', int: '&Wcirc;'},
        {letter: 'ŵ', int: '&wcirc;'},
        {letter: 'Ŷ', int: '&Ycirc;'},
        {letter: 'ŷ', int: '&ycirc;'},
        {letter: 'Ÿ', int: '&Yuml;'},
        {letter: 'Ź', int: '&Zacute;'},
        {letter: 'ź', int: '&zacute;'},
        {letter: 'Ż', int: '&Zdot;'},
        {letter: 'ż', int: '&zdot;'},
        {letter: 'Ž', int: '&Zcaron;'},
        {letter: 'ž', int: '&zcaron;'},
    ]
 
     if (user == 0){
        var authorNames = prompt(`Author's names: `)
            if (authorNames[0] == authorNames[0].toUpperCase() && authorNames[1] == ` ` && authorNames[1] !== '.'){
                difFormat(authorNames)
            }else if (authorNames[0] == authorNames[0].toUpperCase() && authorNames[1] == authorNames[1].toLowerCase() && authorNames[1] !== '.'){
                authorsTagging(authorNames)
            }else if (authorNames[0] == authorNames[0].toLowerCase() && authorNames[1] == authorNames[1].toLowerCase() && authorNames[1] !== '.'){
                authorsTagging(authorNames)
            }else if (authorNames[0] == authorNames[0].toUpperCase() && authorNames[1] == authorNames[1].toUpperCase()){
                difFormat(authorNames)
            }else if (authorNames[0] == authorNames[0].toUpperCase() && authorNames[1] == '.'){
                difFormat(authorNames)
            }else if (authorNames[0] == authorNames[0].toUpperCase() && authorNames[1] == '-'){
                difFormat(authorNames)
            }
        
     } else if(user == 1){
         doi()
     } else if(user == 2){
         URI()
     } else if(user == 3){
         Page()
     } else if(user == 4){
         titleCase()
     } else if (user == 5){
         loopLink()
     } else if (user == 6){
         Volume_Issue()
     } else if (user == 7){
         lowercase()
     } else if(user == 8){
         unicode()
     } else if (user == 9){
        numberedCitation()
     } else if (user == 10){
        removeBold()
     }
 
}, 100);