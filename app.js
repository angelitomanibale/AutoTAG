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
          if(userInput[i] == '-' || userInput[i] == '???' || userInput[i] == '_'){
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
        {letter: '??', int: '&Agrave;'},
        {letter: '??', int: '&Aacute;'},
        {letter: '??', int: '&Acirc;'},
        {letter: '??', int: '&Atilde;'},
        {letter: '??', int: '&Auml;'},
        {letter: '??', int: '&Aring;'},
        {letter: '??', int: '&AElig;'},
        {letter: '??', int: '&Ccedil;'},
        {letter: '??', int: '&Egrave;'},
        {letter: '??', int: '&Eacute;'},
        {letter: '??', int: '&Ecirc;'},
        {letter: '??', int: '&Euml;'},
        {letter: '??', int: '&Igrave;'},
        {letter: '??', int: '&Iacute;'},
        {letter: '??', int: '&Icirc;'},
        {letter: '??', int: '&Iuml;'},
        {letter: '??', int: '&ETH;'},
        {letter: '??', int: '&Ntilde;'},
        {letter: '??', int: '&Ograve;'},
        {letter: '??', int: '&Oacute;'},
        {letter: '??', int: '&Ocirc;'},
        {letter: '??', int: '&Otilde;'},
        {letter: '??', int: '&Ouml;'},
        {letter: '??', int: '&Oslash;'},
        {letter: '??', int: '&Ugrave;'},
        {letter: '??', int: '&Uacute;'},
        {letter: '??', int: '&Ucirc;'},
        {letter: '??', int: '&Uuml;'},
        {letter: '??', int: '&Yacute;'},
        {letter: '??', int: '&THORN;'},
        {letter: '??', int: '&szlig;'},
        {letter: '??', int: '&Ccedil;'},
        {letter: '??', int: '&Ntilde;'},
        {letter: '??', int: '&Gamma;'},
        {letter: '??', int: '&Delta;'},
        {letter: '??', int: '&Sigma;'},
        {letter: '??', int: '&Phi;'},
        {letter: '??', int: '&Omega;'},
        {letter: '??', int: '&alpha;'},
        {letter: '??', int: '&beta;'},
        {letter: '??', int: '&gamma;'},
        {letter: '??', int: '&delta;'},
        {letter: '??', int: '&epsilon;'},
        {letter: '??', int: '&zeta;'},
        {letter: '??', int: '&eta;'},
        {letter: '??', int: '&theta;'},
        {letter: '??', int: '&iota;'},
        {letter: '??', int: '&kappa;'},
        {letter: '??', int: '&lambda;'},
        {letter: '???', int: '&sbquo;'},
        {letter: '???', int: '&ldquo;'},
        {letter: '???', int: '&rdquo;'},
        {letter: '???', int: '&bdquo;'},
        {letter: '???', int: '&dagger;'},
        {letter: '???', int: '&Dagger;'},
        {letter: '???', int: '&bull;'},
        {letter: '???', int: '&hellip;'},
        {letter: '???', int: '&permil;'},
        {letter: '???', int: '&prime;'},
        {letter: '???', int: '&Prime;'},
        {letter: '??', int: '&Cacute;'},
        {letter: '??', int: '&Ccirc;'},
        {letter: '??', int: '&Cdot;'},
        {letter: '??', int: '&Ccaron;'},
        {letter: '??', int: '&Dcaron;'},
        {letter: '??', int: '&dcaron;'},
        {letter: '??', int: '&Dstrok;'},
        {letter: '??', int: '&dstrok;'},
        {letter: '??', int: '&Emacr;'},
        {letter: '??', int: '&emacr;'},
        {letter: '??', int: '&Edot;'},
        {letter: '??', int: '&edot;'},
        {letter: '??', int: '&Eogon;'},
        {letter: '??', int: '&eogon;'},
        {letter: '??', int: '&Ecaron;'},
        {letter: '??', int: '&ecaron;'},
        {letter: '??', int: '&Gcirc;'},
        {letter: '??', int: '&gcirc;'},
        {letter: '??', int: '&Gbreve;'},
        {letter: '??', int: '&gbreve;'},
        {letter: '??', int: '&Gdot;'},
        {letter: '??', int: '&gdot;'},
        {letter: '??', int: '&Gcedil;'},
        {letter: '??', int: '&Hcirc;'},
        {letter: '??', int: '&hcirc;'},
        {letter: '??', int: '&Hstrok;'},
        {letter: '??', int: '&hstrok;'},
        {letter: '??', int: '&Itilde;'},
        {letter: '??', int: '&itilde;'},
        {letter: '??', int: '&Imacr;'},
        {letter: '??', int: '&imacr;'},
        {letter: '??', int: '&Iogon;'},
        {letter: '??', int: '&iogon;'},
        {letter: '??', int: '&Idot;'},
        {letter: '??', int: '&imath;'},
        {letter: '??', int: '&IJlig;'},
        {letter: '??', int: '&ijlig;'},
        {letter: '??', int: '&Jcirc;'},
        {letter: '??', int: '&jcirc;'},
        {letter: '??', int: '&Kcedil;'},
        {letter: '??', int: '&kcedil;'},
        {letter: '??', int: '&kgreen;'},
        {letter: '??', int: '&Lacute;'},
        {letter: '??', int: '&lacute;'},
        {letter: '??', int: '&Lcedil;'},
        {letter: '??', int: '&lcedil;'},
        {letter: '??', int: '&Lcaron;'},
        {letter: '??', int: '&lcaron;'},
        {letter: '??', int: '&Lmidot;'},
        {letter: '??', int: '&lmidot;'},
        {letter: '??', int: '&Lstrok;'},
        {letter: '??', int: '&lstrok;'},
        {letter: '??', int: '&Nacute;'},
        {letter: '??', int: '&nacute;'},
        {letter: '??', int: '&Ncedil;'},
        {letter: '??', int: '&ncedil;'},
        {letter: '??', int: '&Ncaron;'},
        {letter: '??', int: '&ncaron;'},
        {letter: '??', int: '&napos;'},
        {letter: '??', int: '&ENG;'},
        {letter: '??', int: '&eng;'},
        {letter: '??', int: '&Omacr;'},
        {letter: '??', int: '&omacr;'},
        {letter: '??', int: '&Odblac;'},
        {letter: '??', int: '&odblac;'},
        {letter: '??', int: '&OElig;'},
        {letter: '??', int: '&oelig;'},
        {letter: '??', int: '&Racute;'},
        {letter: '??', int: '&racute;'},
        {letter: '??', int: '&Rcedil;'},
        {letter: '??', int: '&rcedil;'},
        {letter: '??', int: '&Rcaron;'},
        {letter: '??', int: '&rcaron;'},
        {letter: '??', int: '&Sacute;'},
        {letter: '??', int: '&sacute;'},
        {letter: '??', int: '&Scirc;'},
        {letter: '??', int: '&scirc;'},
        {letter: '??', int: '&Scedil;'},
        {letter: '??', int: '&scedil;'},
        {letter: '??', int: '&Scaron;'},
        {letter: '??', int: '&scaron;'},
        {letter: '??', int: '&Tcedil;'},
        {letter: '??', int: '&tcedil;'},
        {letter: '??', int: '&Tcaron;'},
        {letter: '??', int: '&tcaron;'},
        {letter: '??', int: '&Tstrok;'},
        {letter: '??', int: '&tstrok;'},
        {letter: '??', int: '&Utilde;'},
        {letter: '??', int: '&utilde;'},
        {letter: '??', int: '&Umacr;'},
        {letter: '??', int: '&umacr;'},
        {letter: '??', int: '&Ubreve;'},
        {letter: '??', int: '&ubreve;'},
        {letter: '??', int: '&Uring;'},
        {letter: '??', int: '&uring;'},
        {letter: '??', int: '&Udblac;'},
        {letter: '??', int: '&udblac;'},
        {letter: '??', int: '&Uogon;'},
        {letter: '??', int: '&uogon;'},
        {letter: '??', int: '&Wcirc;'},
        {letter: '??', int: '&wcirc;'},
        {letter: '??', int: '&Ycirc;'},
        {letter: '??', int: '&ycirc;'},
        {letter: '??', int: '&Yuml;'},
        {letter: '??', int: '&Zacute;'},
        {letter: '??', int: '&zacute;'},
        {letter: '??', int: '&Zdot;'},
        {letter: '??', int: '&zdot;'},
        {letter: '??', int: '&Zcaron;'},
        {letter: '??', int: '&zcaron;'},
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