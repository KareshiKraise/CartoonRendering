#version 430 core

uniform vec3 auxiliar;

out vec4 color;


void main(void)
{
	color = vec4(auxiliar, 1.0);
}