#version 430 core

in vec2 UV;
in vec3 NORMAL;
in vec3 toEye;
in vec3 toLight;


uniform sampler2D tex;

out vec4 color;


float mainColor(vec3 V, vec3 B)
{
	return clamp(dot(V, B), 0.0, 1.0);
}

float specular(vec3 L, vec3 N, vec3 H)
{
	if(dot(N,L) > 0)
	{
		return pow(clamp(dot(H,N), 0.0, 1.0), 65.0);
	}	

	return 0.0;
}

void main(void)
{
	vec3 auxCol = texture(tex, UV).rgb;

	vec3 halfVec = normalize(toLight + toEye);

	float ambient = 0.3;
	float diffuse = mainColor(toLight, NORMAL);
	float spec = specular(toLight, NORMAL, halfVec);
	//float spec = 0.0;
	

	float intensity = clamp(ambient + diffuse + spec, 0.0, 1.0);

	float shade = ceil(intensity * 2) / 2;
	
	//color.xyz = vec3(1.0, 0.71, 0.76) * shade;
	color.xyz = auxCol * shade;
	//color.xyz = vec3(1.0, 0.71, 0.76) * auxCol * shade;

	color.w = 1.0;
}