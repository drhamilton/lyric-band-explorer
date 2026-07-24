/** Lyric Music wordmark (provided brand asset). */
export default function Logo() {
  return (
    <div className="flex shrink-0 items-center">
      {/* Rendered at 163×105 per the design spec; the @2x source (326×210)
          keeps it crisp on high-DPI displays. */}
      <img
        src="/sources/lyric_lg_rgb_mnt_wht@2x.png"
        alt="Lyric Music"
        width={163}
        height={105}
        className="h-[105px] w-[163px]"
      />
    </div>
  )
}
