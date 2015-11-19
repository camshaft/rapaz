var merge = require('../../merge');
var document = require('../window').document;

module.exports = function() {
  return merge(fp(), ['client', 'webgl_fingerprint']);
};

// https://github.com/Valve/fingerprintjs2/blob/dfcaf8e9a6b3323442a9b194f1110ad839712676/fingerprint2.js#L623

function fp() {
  var gl;
  var fa2s = function(fa) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    return "[" + fa[0] + ", " + fa[1] + "]";
  };
  var maxAnisotropy = function(gl) {
    var anisotropy, ext = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
    return ext ? (anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT), 0 === anisotropy && (anisotropy = 2), anisotropy) : null;
  };
  gl = getWebglCanvas();
  if (!gl) return null;

  // WebGL fingerprinting is a combination of techniques, found in MaxMind antifraud script & Augur fingerprinting.
  // First it draws a gradient object with shaders and convers the image to the Base64 string.
  // Then it enumerates all WebGL extensions & capabilities and appends them to the Base64 string, resulting in a huge WebGL string, potentially very unique on each device
  // Since iOS supports webgl starting from version 8.1 and 8.1 runs on several graphics chips, the results may be different across ios devices, but we need to verify it.
  var result = {};
  var vShaderTemplate = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}";
  var fShaderTemplate = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}";
  var vertexPosBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
  var vertices = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  vertexPosBuffer.itemSize = 3;
  vertexPosBuffer.numItems = 3;
  var program = gl.createProgram(), vshader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vshader, vShaderTemplate);
  gl.compileShader(vshader);
  var fshader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fshader, fShaderTemplate);
  gl.compileShader(fshader);
  gl.attachShader(program, vshader);
  gl.attachShader(program, fshader);
  gl.linkProgram(program);
  gl.useProgram(program);
  program.vertexPosAttrib = gl.getAttribLocation(program, "attrVertex");
  program.offsetUniform = gl.getUniformLocation(program, "uniformOffset");
  gl.enableVertexAttribArray(program.vertexPosArray);
  gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0);
  gl.uniform2f(program.offsetUniform, 1, 1);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);
  if (gl.canvas != null) result.dataurl = gl.canvas.toDataURL();
  result.extensions = gl.getSupportedExtensions();
  result.aliased_line_width_range = fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE));
  result.aliased_point_size_range = fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE));
  result.alpha_bits = gl.getParameter(gl.ALPHA_BITS);
  result.antialiasing = !!gl.getContextAttributes().antialias;
  result.blue_bits = gl.getParameter(gl.BLUE_BITS);
  result.depth_bits = gl.getParameter(gl.DEPTH_BITS);
  result.green_bits = gl.getParameter(gl.GREEN_BITS);
  result.max_anisotropy = maxAnisotropy(gl);
  result.max_combined_texture_image_units = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  result.max_cube_map_texture_size = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
  result.max_fragment_uniform_vectors = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
  result.max_render_buffer_size = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
  result.max_texture_image_units = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
  result.max_texture_size = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  result.max_varying_vectors = gl.getParameter(gl.MAX_VARYING_VECTORS);
  result.max_vertex_attribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
  result.max_vertex_texture_image_units = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
  result.max_vertex_uniform_vectors = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
  result.max_viewport_dims = fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS));
  result.red_bits = gl.getParameter(gl.RED_BITS);
  result.renderer = gl.getParameter(gl.RENDERER);
  result.shading_language_version = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);
  result.stencil_bits = gl.getParameter(gl.STENCIL_BITS);
  result.vendor = gl.getParameter(gl.VENDOR);
  result.version = gl.getParameter(gl.VERSION);

  if (!gl.getShaderPrecisionFormat) return result;

  result.webgl_vertex_shader_high_float_precision = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.HIGH_FLOAT).precision;
  result.webgl_vertex_shader_high_float_precision_rangeMin = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.HIGH_FLOAT).rangeMin;
  result.webgl_vertex_shader_high_float_precision_rangeMax = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.HIGH_FLOAT).rangeMax;
  result.webgl_vertex_shader_medium_float_precision = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.MEDIUM_FLOAT).precision;
  result.webgl_vertex_shader_medium_float_precision_rangeMin = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.MEDIUM_FLOAT).rangeMin;
  result.webgl_vertex_shader_medium_float_precision_rangeMax = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.MEDIUM_FLOAT).rangeMax;
  result.webgl_vertex_shader_low_float_precision = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.LOW_FLOAT).precision;
  result.webgl_vertex_shader_low_float_precision_rangeMin = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.LOW_FLOAT).rangeMin;
  result.webgl_vertex_shader_low_float_precision_rangeMax = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.LOW_FLOAT).rangeMax;
  result.webgl_fragment_shader_high_float_precision = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.HIGH_FLOAT).precision;
  result.webgl_fragment_shader_high_float_precision_rangeMin = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.HIGH_FLOAT).rangeMin;
  result.webgl_fragment_shader_high_float_precision_rangeMax = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.HIGH_FLOAT).rangeMax;
  result.webgl_fragment_shader_medium_float_precision = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.MEDIUM_FLOAT).precision;
  result.webgl_fragment_shader_medium_float_precision_rangeMin = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.MEDIUM_FLOAT).rangeMin;
  result.webgl_fragment_shader_medium_float_precision_rangeMax = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.MEDIUM_FLOAT).rangeMax;
  result.webgl_fragment_shader_low_float_precision = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.LOW_FLOAT).precision;
  result.webgl_fragment_shader_low_float_precision_rangeMin = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.LOW_FLOAT).rangeMin;
  result.webgl_fragment_shader_low_float_precision_rangeMax = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.LOW_FLOAT).rangeMax;
  result.webgl_vertex_shader_high_int_precision = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.HIGH_INT).precision;
  result.webgl_vertex_shader_high_int_precision_rangeMin = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.HIGH_INT).rangeMin;
  result.webgl_vertex_shader_high_int_precision_rangeMax = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.HIGH_INT).rangeMax;
  result.webgl_vertex_shader_medium_int_precision = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.MEDIUM_INT).precision;
  result.webgl_vertex_shader_medium_int_precision_rangeMin = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.MEDIUM_INT).rangeMin;
  result.webgl_vertex_shader_medium_int_precision_rangeMax = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.MEDIUM_INT).rangeMax;
  result.webgl_vertex_shader_low_int_precision = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.LOW_INT).precision;
  result.webgl_vertex_shader_low_int_precision_rangeMin = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.LOW_INT).rangeMin;
  result.webgl_vertex_shader_low_int_precision_rangeMax = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.LOW_INT).rangeMax;
  result.webgl_fragment_shader_high_int_precision = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.HIGH_INT).precision;
  result.webgl_fragment_shader_high_int_precision_rangeMin = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.HIGH_INT).rangeMin;
  result.webgl_fragment_shader_high_int_precision_rangeMax = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.HIGH_INT).rangeMax;
  result.webgl_fragment_shader_medium_int_precision = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.MEDIUM_INT).precision;
  result.webgl_fragment_shader_medium_int_precision_rangeMin = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.MEDIUM_INT).rangeMin;
  result.webgl_fragment_shader_medium_int_precision_rangeMax = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.MEDIUM_INT).rangeMax;
  result.webgl_fragment_shader_low_int_precision = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.LOW_INT).precision;
  result.webgl_fragment_shader_low_int_precision_rangeMin = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.LOW_INT).rangeMin;
  result.webgl_fragment_shader_low_int_precision_rangeMax = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.LOW_INT).rangeMax;

  return result;
}

function getWebglCanvas() {
  var canvas = document.createElement("canvas");
  try {
    return canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  } catch(e) { /* squelch */ }
}
