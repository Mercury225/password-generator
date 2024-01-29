#Some comments
- i struggled to change the customise the slider properly

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