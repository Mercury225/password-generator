## Some comments

- had a lot of fun doing the password JS code, and thoroughly enjoyed the challenge!

## if you can help on this:

- Wasn't very sure how to customise the slider using the input tag type = range. I wanted to change the color of the slider-thumb to grey but was unsuccessful, if you can help on this please!

I tried this:
`#length-number {
  background-color: transparent;
  appearance: none;
}
#length-number::-webkit-slider-runnable-track {
  background-color: $green;
}
#length-number::-webkit-slider-thumb {
  background-color: $grey;
}
`

-webkit-slider-thumb didn't work, but runnable-track did, still it just gave a green background with a blue thumb, which is not what i want

so i ended up just doing this:
`#length-number {
  accent-color: $green;
}
`
