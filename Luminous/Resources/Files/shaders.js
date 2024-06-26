
	var matrixVertexShader2 =

	`
		
   	varying vec3 vPos;
    varying vec3 vNormal;
    void main() {
      vPos = (modelMatrix * vec4(position, 1.0 )).xyz;
      vNormal = normalMatrix * normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
 
 	`
 	;
 	
 	
 	var matrixFragmentShader2 =

	`
	
    uniform vec3 diffuse;
	varying vec3 vPos;
	varying vec3 vNormal;

	struct PointLight {
 	 vec3 position;
 	 vec3 color;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

	void main() {
	  vec4 addedLights = vec4(0.1, 0.1, 0.1, 1.0);
	  for(int l = 0; l < NUM_POINT_LIGHTS; l++) {
	    vec3 adjustedLight = pointLights[l].position + cameraPosition;
	    vec3 lightDirection = normalize(vPos - adjustedLight);
	    addedLights.rgb += clamp(dot(-lightDirection, vNormal), 0.0, 1.0) * pointLights[l].color;
	  }
	  gl_FragColor = addedLights * 0.8;
	}
    
    `
	;


