#version 430 

in vec3 NORMAL;
in vec2 UV;
in vec3 toLight;
in vec3 toEye;

uniform sampler2D tex;
uniform sampler2D tex1;
uniform sampler2D tex2;
uniform sampler2D tex3;
uniform sampler2D tex4;
uniform sampler2D tex5;

out vec4 COLOR;




void main(void)
{
	
	//vec4 baseCol = vec4(1.0, 0.0 ,0.0, 1.0);
	
	vec3 normal = normalize(NORMAL);
	vec3 lightvec = normalize(toLight);
	vec3 eyevec = normalize(toEye);

	float diffuse = clamp(dot(normal, lightvec), 0.0, 1.0);
	float specular = 0;

	if(diffuse > 0.0)
	{
		vec3 halfvec = normalize(lightvec + eyevec);
		float half_normal = dot(halfvec, normal);
		specular = pow(half_normal, 64);
	}

	float ambient = 0.10;

	float intensity =  clamp(ambient + diffuse + specular, 0.0, 1.0);

	vec3 fetch = vec3(0.0, 0.0, 0.0);


	float part = 1.0/6.0;


	if(diffuse <= part)
	{
		float temp = diffuse;
		temp *= 6;
		fetch.rgb = mix(texture(tex5, UV).rgb, texture(tex4, UV).rgb, temp);
		
	}

	if(diffuse > part && diffuse <= (part * 2))
	{
		
		float temp = diffuse - part;
		temp *= 6;
		fetch.rgb = mix(texture(tex4, UV).rgb, texture(tex3, UV).rgb, temp);
		
	}

	if(diffuse > (part * 2) && diffuse <= (part * 3))
	{
		
		float temp = diffuse - part * 2;
		temp *= 6;
		fetch.rgb = mix(texture(tex3, UV).rgb, texture(tex2, UV).rgb , temp);
		
	}

	if(diffuse > (part * 3) && diffuse <= (part * 4))
	{
		
		float temp = diffuse - part * 3;
		temp *= 6;
		fetch.rgb = mix(texture(tex2, UV).rgb, texture(tex1, UV).rgb , temp);
		
	}


	if(diffuse > (part * 4) && diffuse <= (part * 5))
	{
		
		float temp = diffuse - part * 4;
		temp *= 6;
		fetch.rgb = mix(texture(tex1, UV).rgb, texture(tex, UV).rgb , temp);
		
	}

	if(diffuse > (part * 5))
	{
		
		float temp = diffuse - part * 5;
		temp *= 6;
		fetch.rgb = mix(texture(tex, UV).rgb, vec3(1.0, 1.0, 1.0) , temp);
		
	}

	
	COLOR = vec4(fetch, 1.0);
		
		
	
}
