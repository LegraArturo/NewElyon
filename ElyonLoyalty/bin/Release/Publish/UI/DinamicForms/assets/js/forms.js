'use strict';
let container = document.querySelector('.build-form');
let renderContainer = document.querySelector('.render-form');
let formeoOpts = {
    container: container,
    
    i18n: {
        location: 'https://draggable.github.io/formeo/assets/lang/' 
    },
     
    // allowEdit: false,
    controls: {
        sortable: false,
        groupOrder: [
            'common',
            'html'
        ],
        elements: [
            {
                tag: 'input',
                attrs: {
                    type: 'radio',
                    required: false
                },
                config: {
                    label: 'Radio Group',
                    disabledAttrs: ['type']
                },
                meta: {
                    group: 'common',
                    icon: 'radio-group',
                    id: 'radio'
                },
                options: (() => {
                    let options = [1, 2, 3].map(i => {
                        return {
                            label: 'Radio ' + i,
                            value: 'radio-' + i,
                            selected: false
                        };
                    });
                    let otherOption = {
                        label: 'Other',
                        value: 'other',
                        selected: false
                    };
                    options.push(otherOption);
                    return options;
                })(),
                action: {
                    mouseover: evt => {
                        console.log(evt);
                        const { target } = evt;
                        if (target.value === 'other') {
                            const otherInput = target.cloneNode(true);
                            otherInput.type = 'text';
                            target.parentElement.appendChild(otherInput);
                        }
                    }
                }
            }, {
                tag: 'input',
                attrs: {
                    type: 'radio',
                    required: false
                },
                config: {
                    label: 'Radio Group',
                    disabledAttrs: ['type']
                },
                meta: {
                    group: 'common',
                    icon: 'radio-group',
                    id: 'radio'
                },
                options: (() => {
                    let options = [1, 2, 3].map(i => {
                        return {
                            label: 'Radio ' + i,
                            value: 'radio-' + i,
                            selected: false
                        };
                    });
                    let otherOption = {
                        label: 'Other',
                        value: 'other',
                        selected: false
                    };
                    options.push(otherOption);
                    return options;
                })(),
                action: {
                    mouseover: evt => {
                        console.log(evt);
                        const { target } = evt;
                        if (target.value === 'other') {
                            const otherInput = target.cloneNode(true);
                            otherInput.type = 'text';
                            target.parentElement.appendChild(otherInput);
                        }
                    }
                }
            },
            {
                tag: 'textarea',
                attrs: {
                    maxlength: 500,
                    className: 'form-control'
                },
                config: {
                    label: 'Area de Texto'
                },
                meta: {
                    group: 'common',
                    icon: 'textarea',
                    id: 'textarea'
                }
            }

        ],
        elementOrder: {
            common: [
                'button',
                'checkbox',
                'date-input',
                'hidden',
                'upload',
                'number',
                'radio',
                'select',
                'text-input',
                'textarea'
            ]
        }
    },
    events: {
        // onUpdate: console.log,
        onsave: console.log
    },

    //  svgSprite: 'https://draggable.github.io/formeo/assets/img/formeo-sprite.svg',
    // debug: true,
    sessionStorage: true,
    editPanelOrder: ['attrs', 'options']
};

const formeo = new window.Formeo(formeoOpts);
let editing = true;

var locale = document.getElementById('locale');

let formeoLocale = window.sessionStorage.getItem('formeo-locale');
if (formeoLocale) {
    locale.value = formeoLocale;
}

locale.addEventListener('change', function () {
    formeo.i18n.setLang(locale.value);
});


let toggleEdit = document.getElementById('renderForm');
let viewDataBtn = document.getElementById('viewData');
let resetDemo = document.getElementById('reloadBtn');

// debugBtn.onclick = function() {
//   debugWrap.classList.toggle('open');
// };

resetDemo.onclick = function () {
    window.sessionStorage.removeItem('formData');
    location.reload();
};

toggleEdit.onclick = evt => {
    document.body.classList.toggle('form-rendered', editing);
    if (editing) {
        formeo.render(renderContainer);
        evt.target.innerHTML = 'Editar Fomulario';
    } else {
        evt.target.innerHTML = 'Mostrar Formulario';
    }

    return editing = !editing;
};

viewDataBtn.onclick = evt => {
    //data[element.name] = element.value;
    var d = document.getElementById('txtLog');
    d.textContent = window.JSON.stringify(JSON.parse(formeo.formData), null, '  ');

    //d.value = window.JSON.stringify(JSON.parse(formData), null, '  ');
 
    //console.log(window.JSON.stringify(JSON.parse(formeo.formData), null, '  '));

    //var formeoNew = new Formeo(formeoOpts, d.value);
    //formeo.render(formeoNew);
};

container.addEventListener('formeoSaved', function (evt) {
    console.log("You data is :", evt.formData);
});
 
document.addEventListener('formeoLoaded', function () {
    console.log("Formulario cargado");
});
document.getElementById('control-filter')
    .addEventListener('input', function (e) {
        formeo.controls.actions.filter(e.target.value);
    });

jQuery(function ($) {
    var fbTemplate = document.getElementById("build-wrap");
    var options = {
        disabledActionButtons: ["data", "clear"],
        disableFields: [
            "button",
            "autocomplete",
            "hidden",
            "file",
            "date",
            "header",
            "number"
        ],
        disabledAttrs: [
            "access",
            "multiple",
            "toggle",
            "placeholder",
            "className",
            "inline",
            "other",
            "subtype",
            "description",
            "maxlength",
            "rows"
        ],
        typeUserAttrs: {
            "radio-group": {
                randomize: {
                    label: "Randomize",
                    type: "checkbox"
                },
                feedback: {
                    label: "Feedback",
                    type: "text",
                    placeholder: "Insert feedback for this question here"
                }
            },
            "checkbox-group": {
                randomize: {
                    label: "Randomize",
                    type: "checkbox",
                    checked: true
                },
                feedback: {
                    label: "Feedback",
                    type: "text",
                    placeholder: "Insert feedback for this question here"
                }
            },
            select: {
                randomize: {
                    label: "Randomize",
                    type: "checkbox",
                    value: true
                },
                feedback: {
                    label: "Feedback",
                    type: "text",
                    placeholder: "Insert feedback for this question here"
                }
            },
            text: {
                content: {
                    label: "Content",
                    type: "textArea",
                    placeholder: "Insert feedback for this question here"
                },
                feedback: {
                    label: "Feedback",
                    type: "text",
                    placeholder: "Insert feedback for this question here"
                }
            },
            paragraph: {
                name: {
                    label: "Name",
                    type: "text"
                }
            }
        },
        formData:
            '[{"type":"checkbox-group","label":"Checkbox Group","name":"checkbox-group-1501853553952","feedback":"","randomize":"true","values":[{"label":"Option 1","value":"option-1","selected":true}]}]',
        dataType: "json",
        layoutTemplates: {
            label: function (label, data) {
                return $('<label class="bright"/>')
                    .attr("for", data.id)
                    .append(label);
            }
        }
    };
    formeo.render(options);
    //$(fbTemplate).render(options);
});