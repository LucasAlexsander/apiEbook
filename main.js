    function getEbookName() {

        let search = document.getElementsByTagName('input')[0].value

        let url =`https://www.googleapis.com/books/v1/volumes?q=${search}&filter=free-ebooks&maxResults=40&`;

        console.log(url)

        let reqUrl = new XMLHttpRequest();
        reqUrl.open('GET', url);

        reqUrl.onreadystatechange = () => {
            if(reqUrl.readyState == 4 && reqUrl.status == 200) {
                let responseText = reqUrl.responseText;
                
                responseText = JSON.parse(responseText);
                
                
                for(let i in responseText.items) {
                    console.log(responseText.items[i]);
                    let item = responseText.items[i];


                    let divRow = document.createElement('div')
                    divRow.className = 'row'

                    let divCol = document.createElement('div')
                    divCol.className = 'col'

                    
                    divRow.appendChild(divCol)

                    let p1 = document.createElement('p')
                    p1.innerHTML = '<strong>Title: </strong>' + item.volumeInfo.title

                    let authors = ''
                    for(let i in item.volumeInfo.authors) {
                        if (authors) authors += ', '
                        authors += item.volumeInfo.authors[i]
                    }

                    let p2 = document.createElement('p')
                    p2.innerHTML = '<strong>Author: </strong>' + authors

                    let p3 = document.createElement('p')
                    p3.innerHTML = '<strong>Language: </strong>' + item.volumeInfo.language

                    let p4 = document.createElement('p')
                    p4.innerHTML = '<strong>Published date: : </strong>' + item.volumeInfo.publishedDate

                    let link = item.accessInfo.pdf.downloadLink
                    let linkTipo = 'PDF'
                    if(link == undefined) {
                        link = item.accessInfo.epub.downloadLink
                        linkTipo = 'ePub'
                    }

                    let p5 = document.createElement('p')
                    p5.innerHTML = `<strong>Link em ${linkTipo} : </strong> <a href= ${link}> Download </a>`

                    let hr = document.createElement('hr')

                    divCol.appendChild(p1)
                    divCol.appendChild(p2)
                    divCol.appendChild(p3)
                    divCol.appendChild(p4)
                    divCol.appendChild(p5)
                    divCol.appendChild(hr)

                    // E-book capa normal = item.volumeInfo.imageLinks.thumnail
                    // E-book capa pequena = item.volumeInfo.imageLinks.smallThumnail

                    document.getElementById('ebookList').appendChild(divRow)                    
                } 
            }
        }

        reqUrl.send(); 
    }
			