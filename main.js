class Clase {
	constructor(datos) {
		this.herencias = [];
		this.implementaciones = [];
		this.atributos = [];
		this.metodos = [];

		this.nombre = datos.name;
		this.tipo = datos.type.replace("uml.", "");

		for(var i = 0; i < datos.attributes.length; i++){
			this.codificarAtributo(datos.attributes[i]);
		}

		for(var i = 0; i < datos.methods.length; i++){
			this.codificarMetodo(datos.methods[i]);
		}
	}

	agregarHerencia(clase) {
		this.herencias.push(clase.nombre);
	}

	agregarImplementacion(clase) {
		this.implementaciones.push(clase.nombre);
	}

	agregarAtributo(clase) {
		this.atributos.push({
			"tipo": clase.nombre,
			"nombre": clase.nombre.toLowerCase(),
			"visibilidad": "-"
		});
	}

	codificarAtributo(attr) {
		var atributo = {
			"tipo": "",
			"nombre": "",
			"visibilidad": ""
		};

		var v = this.getVisibilidad(attr,false);
		attr = v[1];

		atributo.visibilidad = v[0];
		atributo.nombre = attr.substring(0, attr.indexOf(":")).trim();
		atributo.tipo = attr.substring(attr.indexOf(":") + 1).trim();

		this.atributos.push(atributo);
	}

	codificarMetodo(metodo){
		var m = {
			"retorno": "",
			"parametros": [],
			"nombre": "",
			"visibilidad": ""
		};

		var v = this.getVisibilidad(metodo,true);
		metodo = v[1];

		m.visibilidad = v[0];
		m.nombre = metodo.substring(0, metodo.indexOf("(")).trim();
		m.retorno = metodo.substring(metodo.lastIndexOf(":") + 1).trim();

		var pams = metodo.substring(metodo.indexOf("(") + 1,metodo.indexOf(")")).trim();
		m.parametros = pams;

		this.metodos.push(m);
	}

	getVisibilidad(str,vis){
		var v = ["+","-","~","#"];
		var visibilidad = "";

		if(v.indexOf(str[0]) != -1){
			visibilidad = str[0];
			str = str.replace(str[0], "");
			str = str.trim();
		}
		else {
			visibilidad = vis? "+": "-";
		}

		return [visibilidad,str];
	}
}

function getClasses(cells){
	var elementos = {};
	for (var i = 0; i < cells.length; i++) {
		switch(cells[i].type){
			case "uml.Interface":
			case "uml.Class":
			case "uml.Abstract":
				elementos[cells[i].id] = new Clase(cells[i]);
				break;
			case "uml.Generalization":
				elementos[cells[i].source.id].agregarHerencia(elementos[cells[i].target.id]);
				break;
			case "uml.Implementation":
				elementos[cells[i].source.id].agregarImplementacion(elementos[cells[i].target.id]);
				break;
			case "uml.Aggregation":
			case "uml.Composition":
			case "uml.Association":
				elementos[cells[i].source.id].agregarAtributo(elementos[cells[i].target.id]);
				break;

		}
	}
	return elementos;
}

var datos = { 
   "cells":[ 
      { 
         "type":"uml.Interface",
         "name":"Mammal",
         "attributes":[ 
            "dob: Date"
         ],
         "methods":[ 
            "+ setDateOfBirth(dob: Date): Void",
            "+ getAgeAsDays(): Numeric"
         ],
         "position":{ 
            "x":314,
            "y":40
         },
         "size":{ 
            "width":240,
            "height":100
         },
         "angle":0,
         "id":"422926f6-d70d-47e0-af86-d070dd0d2e20",
         "z":1,
         "attrs":{ 
            ".uml-class-name-rect":{ 
               "fill":"#feb662",
               "stroke":"#ffffff",
               "stroke-width":0.5,
               "height":60,
               "transform":"translate(0,0)"
            },
            ".uml-class-attrs-rect":{ 
               "fill":"#fdc886",
               "stroke":"#fff",
               "stroke-width":0.5,
               "height":40,
               "transform":"translate(0,60)"
            },
            ".uml-class-methods-rect":{ 
               "fill":"#fdc886",
               "stroke":"#fff",
               "stroke-width":0.5,
               "height":60,
               "transform":"translate(0,100)"
            },
            ".uml-class-name-text":{ 
               "text":"<<Interface>>\nMammal"
            },
            ".uml-class-attrs-text":{ 
               "ref-y":0.5,
               "y-alignment":"middle",
               "text":"dob: Date"
            },
            ".uml-class-methods-text":{ 
               "ref-y":0.5,
               "y-alignment":"middle",
               "text":"+ setDateOfBirth(dob: Date): Void\n+ getAgeAsDays(): Numeric"
            }
         }
      },
      { 
         "type":"uml.Abstract",
         "name":"Person",
         "attributes":[ 
            "firstName: String",
            "lastName: String"
         ],
         "methods":[ 
            "+ setName(first: String, last: String): Void",
            "+ getName(): String"
         ],
         "position":{ 
            "x":300,
            "y":300
         },
         "size":{ 
            "width":260,
            "height":100
         },
         "angle":0,
         "id":"db034014-46d6-48b2-b00c-a02eaef1d31d",
         "z":2,
         "attrs":{ 
            ".uml-class-name-rect":{ 
               "fill":"#68ddd5",
               "stroke":"#ffffff",
               "stroke-width":0.5,
               "height":60,
               "transform":"translate(0,0)"
            },
            ".uml-class-attrs-rect":{ 
               "fill":"#9687fe",
               "stroke":"#fff",
               "stroke-width":0.5,
               "height":60,
               "transform":"translate(0,60)"
            },
            ".uml-class-methods-rect":{ 
               "fill":"#9687fe",
               "stroke":"#fff",
               "stroke-width":0.5,
               "height":60,
               "transform":"translate(0,120)"
            },
            ".uml-class-name-text":{ 
               "text":"<<Abstract>>\nPerson"
            },
            ".uml-class-attrs-text":{ 
               "text":"firstName: String\nlastName: String"
            },
            ".uml-class-methods-text":{ 
               "text":"+ setName(first: String, last: String): Void\n+ getName(): String"
            },
            ".uml-class-methods-text, .uml-class-attrs-text":{ 
               "fill":"#fff"
            }
         }
      },
      { 
         "type":"uml.Class",
         "name":"BloodGroup",
         "attributes":[ 
            "bloodGroup: String"
         ],
         "methods":[ 
            "+ isCompatible(bG: String): Boolean"
         ],
         "position":{ 
            "x":20,
            "y":190
         },
         "size":{ 
            "width":220,
            "height":100
         },
         "angle":0,
         "id":"9da586af-9da1-45e6-b1ed-2046e05a0ece",
         "z":3,
         "attrs":{ 
            ".uml-class-name-rect":{ 
               "stroke":"#fff",
               "stroke-width":0.5,
               "fill":"#ff8450",
               "height":40,
               "transform":"translate(0,0)"
            },
            ".uml-class-attrs-rect":{ 
               "stroke":"#fff",
               "stroke-width":0.5,
               "fill":"#fe976a",
               "height":40,
               "transform":"translate(0,40)"
            },
            ".uml-class-methods-rect":{ 
               "stroke":"#fff",
               "stroke-width":0.5,
               "fill":"#fe976a",
               "height":40,
               "transform":"translate(0,80)"
            },
            ".uml-class-name-text":{ 
               "text":"BloodGroup"
            },
            ".uml-class-attrs-text":{ 
               "ref-y":0.5,
               "y-alignment":"middle",
               "text":"bloodGroup: String"
            },
            ".uml-class-methods-text":{ 
               "ref-y":0.5,
               "y-alignment":"middle",
               "text":"+ isCompatible(bG: String): Boolean"
            }
         }
      },
      { 
         "type":"uml.Class",
         "name":"Address",
         "attributes":[ 
            "houseNumber: Integer",
            "streetName: String",
            "town: String",
            "postcode: String"
         ],
         "methods":[ 

         ],
         "position":{ 
            "x":609,
            "y":169
         },
         "size":{ 
            "width":160,
            "height":100
         },
         "angle":0,
         "id":"7b25ff2f-1b28-430f-bfec-ea9e9b194e44",
         "z":4,
         "attrs":{ 
            ".uml-class-name-rect":{ 
               "stroke":"#fff",
               "stroke-width":0.5,
               "fill":"#ff8450",
               "height":40,
               "transform":"translate(0,0)"
            },
            ".uml-class-attrs-rect":{ 
               "stroke":"#fff",
               "stroke-width":0.5,
               "fill":"#fe976a",
               "height":100,
               "transform":"translate(0,40)"
            },
            ".uml-class-methods-rect":{ 
               "stroke":"#fff",
               "stroke-width":0.5,
               "fill":"#fe976a",
               "height":20,
               "transform":"translate(0,140)"
            },
            ".uml-class-name-text":{ 
               "text":"Address"
            },
            ".uml-class-attrs-text":{ 
               "ref-y":0.5,
               "y-alignment":"middle",
               "text":"houseNumber: Integer\nstreetName: String\ntown: String\npostcode: String"
            },
            ".uml-class-methods-text":{ 
               "text":""
            }
         }
      },
      { 
         "type":"uml.Class",
         "name":"Man",
         "attributes":[ 

         ],
         "methods":[ 

         ],
         "position":{ 
            "x":200,
            "y":500
         },
         "size":{ 
            "width":180,
            "height":50
         },
         "angle":0,
         "id":"2a85e27a-0337-4461-b8e2-d8cb39b8eb0d",
         "z":5,
         "attrs":{ 
            ".uml-class-name-rect":{ 
               "stroke":"#fff",
               "stroke-width":0.5,
               "fill":"#ff8450",
               "height":40,
               "transform":"translate(0,0)"
            },
            ".uml-class-attrs-rect":{ 
               "stroke":"#fff",
               "stroke-width":0.5,
               "fill":"#fe976a",
               "height":20,
               "transform":"translate(0,40)"
            },
            ".uml-class-methods-rect":{ 
               "stroke":"#fff",
               "stroke-width":0.5,
               "fill":"#fe976a",
               "height":20,
               "transform":"translate(0,60)"
            },
            ".uml-class-name-text":{ 
               "text":"Man"
            },
            ".uml-class-attrs-text":{ 
               "text":""
            },
            ".uml-class-methods-text":{ 
               "text":""
            }
         }
      },
      { 
         "type":"uml.Class",
         "name":"Woman",
         "attributes":[ 

         ],
         "methods":[ 
            "+ giveABrith(): Person []"
         ],
         "position":{ 
            "x":450,
            "y":500
         },
         "size":{ 
            "width":180,
            "height":50
         },
         "angle":0,
         "id":"6dac51c0-bb76-480e-82bd-e3299772572b",
         "z":6,
         "attrs":{ 
            ".uml-class-name-rect":{ 
               "stroke":"#fff",
               "stroke-width":0.5,
               "fill":"#ff8450",
               "height":40,
               "transform":"translate(0,0)"
            },
            ".uml-class-attrs-rect":{ 
               "stroke":"#fff",
               "stroke-width":0.5,
               "fill":"#fe976a",
               "height":20,
               "transform":"translate(0,40)"
            },
            ".uml-class-methods-rect":{ 
               "stroke":"#fff",
               "stroke-width":0.5,
               "fill":"#fe976a",
               "height":40,
               "transform":"translate(0,60)"
            },
            ".uml-class-name-text":{ 
               "text":"Woman"
            },
            ".uml-class-attrs-text":{ 
               "text":""
            },
            ".uml-class-methods-text":{ 
               "ref-y":0.5,
               "y-alignment":"middle",
               "text":"+ giveABrith(): Person []"
            }
         }
      },
      { 
         "type":"uml.Generalization",
         "source":{ 
            "id":"2a85e27a-0337-4461-b8e2-d8cb39b8eb0d"
         },
         "target":{ 
            "id":"db034014-46d6-48b2-b00c-a02eaef1d31d"
         },
         "id":"f4f7d850-f6d8-4259-bb1a-31c529b3e97b",
         "z":7,
         "vertices":[ 
            { 
               "x":289,
               "y":445
            },
            { 
               "x":432,
               "y":446
            }
         ],
         "attrs":{ 

         }
      },
      { 
         "type":"uml.Generalization",
         "source":{ 
            "id":"6dac51c0-bb76-480e-82bd-e3299772572b"
         },
         "target":{ 
            "id":"db034014-46d6-48b2-b00c-a02eaef1d31d"
         },
         "id":"5df37381-ab18-44b2-9705-321e7aa2fa2d",
         "z":8,
         "vertices":[ 
            { 
               "x":542,
               "y":444
            },
            { 
               "x":431,
               "y":445
            }
         ],
         "attrs":{ 

         }
      },
      { 
         "type":"uml.Implementation",
         "source":{ 
            "id":"db034014-46d6-48b2-b00c-a02eaef1d31d"
         },
         "target":{ 
            "id":"422926f6-d70d-47e0-af86-d070dd0d2e20"
         },
         "id":"497cde8b-af98-4f55-91a7-36c1660ad3ce",
         "z":9,
         "attrs":{ 

         }
      },
      { 
         "type":"uml.Aggregation",
         "source":{ 
            "id":"db034014-46d6-48b2-b00c-a02eaef1d31d"
         },
         "target":{ 
            "id":"7b25ff2f-1b28-430f-bfec-ea9e9b194e44"
         },
         "id":"cc51b506-7237-4c71-b034-cea5b24a5af8",
         "z":10,
         "vertices":[ 
            { 
               "x":690,
               "y":350
            }
         ],
         "attrs":{ 

         }
      },
      { 
         "type":"uml.Composition",
         "source":{ 
            "id":"db034014-46d6-48b2-b00c-a02eaef1d31d"
         },
         "target":{ 
            "id":"9da586af-9da1-45e6-b1ed-2046e05a0ece"
         },
         "id":"006d5c7a-ffcc-48cd-8935-6ee6ea948f8f",
         "z":11,
         "vertices":[ 
            { 
               "x":127,
               "y":348
            }
         ],
         "attrs":{ 

         }
      }
   ]
};

console.log( JSON.stringify( getClasses(datos.cells) ) );
