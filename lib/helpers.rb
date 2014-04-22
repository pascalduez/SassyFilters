
require "sass"
require "erb"

module SassyFilters

  def self.included(base)
    if base.respond_to?(:declare)
      base.declare :sprintf, [:format, :args]
      base.declare :inline_svg, [:svgStr]
      base.declare :inline_svg, [:svgStr, :base64]
      base.declare :inline_svg, [:svgStr, :base64, :escape]
    end
  end


  def sprintf(format, *args)
    assert_type format, :String
    assert_type args, :Array

    Sass::Script::String.new(format.value % args)
  end


  def inline_svg(svgStr, base64 = bool(false), escape = bool(false))
    assert_type svgStr, :String

    svgStr = svgStr.value.strip.gsub(/>\s+</, "><")

    if base64.to_bool
      inline = [svgStr].flatten.pack("m0")
    elsif escape.to_bool
      inline = ERB::Util.url_encode(svgStr)
    else
      inline = svgStr.gsub(/#/, "%23")
    end

    unquoted_string(inline)
  end

end


module Sass::Script::Functions
  include SassyFilters
end
