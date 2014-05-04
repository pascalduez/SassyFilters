
require "sass"
require "erb"

module SassyFilters
  def self.included(base)
    if base.respond_to?(:declare)
      base.declare :svg_data, [:svgStr, :encoding]
    end
  end

  def svg_data(svgStr, encoding)
    assert_type svgStr, :String, :svgStr
    assert_type encoding, :String, :encoding

    unless %w[base64 escaped raw].include?(encoding.value)
      raise ArgumentError.new("$encoding must be either base64, escaped or raw")
    end

    svgStr = svgStr.value.strip.gsub(/>\s+</, "><")

    case encoding.value
    when "base64"
      data = [svgStr].flatten.pack("m0")
    when "escaped"
      data = ERB::Util.url_encode(svgStr)
    else
      data = svgStr.gsub(/#/, "%23")
    end

    unquoted_string(data)
  end
end

module Sass::Script::Functions
  include SassyFilters
end
