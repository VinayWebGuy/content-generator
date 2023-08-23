let classCSS = {};
let addedClasses = [];
$('#elem').on('change',function(){
    let val = $(this).val();
    $('.addon').addClass('hidden');
    $('._addon').removeClass('hidden');
    if(val === "p" || val=== "h1" || val=== "h2" || val=== "h3" || val=== "h4" || val=== "h5" || val=== "h6" || val=== "span" || val=== "b" || val=== "i" || val=== "em" || val=== "mark" || val=== "div" || val=== "section"){
        $('#inner-content').removeClass('hidden')
    }
    else if(val === 'a' || val === 'img'){
        $('#link').removeClass('hidden')
        if(val === "a"){
            $('#inner-content').removeClass('hidden')
        }
        if(val === "img"){
            $('#size').removeClass('hidden')
        }
    }
    else if(val === 'br' || val === 'hr'){
        $('._addon').addClass('hidden');
    }
   $('#cls').val('');
   $('#iid').val('');
   $('#height').val('');
   $('#width').val('');
   $('#a_link').val('');
   $('#content').val('');
})
$('#form').on('submit',function(e){
    e.preventDefault();
    $('#css-container').addClass('hidden');
    $('#results').removeClass('css-active');
    let content = $('#content').val();
    let elem = $('#elem').val();
    let cls = $('#cls').val();
    let iid = $('#iid').val();
    if(elem==='a'){
        let link = $('#a_link').val();
        let target = "_blank";
        addLink(elem, content, cls, iid, link, target)
    }
    else if(elem==='img'){
        let link = $('#a_link').val();
        let height = $('#height').val();
        let width = $('#width').val();
        addImg(elem, cls, iid, link, height, width)
    }
    else if(elem==='br' || elem==='hr'){
        addBreak(elem)
    }
    else if(elem!==''){
        addElem(elem, content, cls, iid)
    }
})
$('#clear').on('click', function(){
    $('#results').html('');
    $('#css-container').addClass('hidden');
    $('.css-data').html('');
    $('#results').removeClass('css-active');
})
function addElem(elem, content, cls, iid) {
    let html = `<${elem} class="${cls} result-element" id="${iid}">${content}</${elem}>`;
    $('#results').append(html);
    if (classCSS[cls]) {
        $(`.${cls}`).attr('style', classCSS[cls]);
      }
  }
  function addLink(elem, content, cls, iid, link, target) {
    let html = `<${elem} href="${link}" target="${target}" class="${cls} result-element" id="${iid}">${content}</${elem}>`;
    $('#results').append(html);
    if (classCSS[cls]) {
        $(`.${cls}`).attr('style', classCSS[cls]);
      }
  }
  function addImg(elem, cls, iid, link, height, width) {
    let html = `<${elem} src="${link}" class="${cls} result-element" id="${iid}" height="${height}" width="{width}" />`;
    $('#results').append(html);
    if (classCSS[cls]) {
        $(`.${cls}`).attr('style', classCSS[cls]);
      }
  }
function addBreak(elem){
    let html = `<${elem}/>`;
    $('#results').append(html);
}
$('#add-css').on('click', function () {
    $('#css-container').toggleClass('hidden');
    $('#results').toggleClass('css-active');
    cssLogic();
  });
function applyCssToElements() {
    $('.result-element').each(function () {
      const cls = $(this).attr('class').split(' ').filter(cls => cls !== 'result-element')[0];
      if (cls && classCSS[cls]) {
        $(this).attr('style', classCSS[cls]);
      } else {
        $(this).removeAttr('style');
      }
    });
  }
$('#save-css').on('click', function () {
    if ($('#results').hasClass('css-active')) {
      let cssString = '';
      $('.single-class').each(function () {
        const cls = $(this).find('.selected-class').text();
        const cssProperties = $(this).find('.selected-class-properties').text();
        if (cls !== '' && cssProperties !== '') {
          if (!addedClasses.includes(cls)) {
            cssString += `.${cls} { ${cssProperties} }\n`;
            classCSS[cls] = cssProperties;
            addedClasses.push(cls);
          } else {
            // If class already exists, update its CSS properties
            cssString = cssString.replace(new RegExp(`\\.${cls} \\{[^}]+\\}`), `.${cls} { ${cssProperties} }`);
            classCSS[cls] = cssProperties;
          }
        }
      });
      applyCssToElements();
      applyCssToStylesheet(cssString);
    }
  });
function applyCssToStylesheet(cssString) {
  const styleTag = $('#dynamic-styles');
  if (styleTag.length === 0) {
    $('head').append(`<style id="dynamic-styles">${cssString}</style>`);
  } else {
    styleTag.text(cssString);
  }
}
function cssLogic() {
  if ($('#results').hasClass('css-active')) {
    $('#results .result-element').off('click').on('click', function () {
      let classes = $(this).attr('class').split(' ');
      classes = classes.filter(cls => cls !== 'result-element');
      let cls = classes.length > 0 ? classes[0] : '';
      if (cls !== '') {
        let dataa = `<div class="single-class">
          <div class="selected-class">${cls}</div>
          <div class="selected-class-properties" contenteditable="true" autofocus="true"></div>
        </div>`;
        if (!addedClasses.includes(cls)) {
          $('.css-data').append(dataa);
          $(this).removeAttr('style'); // Remove inline styles for the element
          addedClasses.push(cls);
        }
      }
    });
  }
}
// Existing code...
