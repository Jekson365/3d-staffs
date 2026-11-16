Reference pictures, one set per flat. The model of each flat is checked against <name>.webp / .png with tools/compare.html.

flat1.webp            flat 1: the top-down render the model was built from
                      (https://x2.ge/assets/3d_render_images/648898d9c8e80.webp, 791x600 px, 58.7 px per metre,
                      outer north-west corner at pixel (167, 5)). Areas: hall 4, living room 24.6, bedroom 18.7,
                      bathroom 5.4, balcony 4 = 56.7 m2.
flat2.webp            flat 2: flat2-original.webp turned a quarter turn anticlockwise (600x790 px), so the bedroom
                      windows and the balcony face south. 37.35 px per metre (from the pixel area of all rooms over
                      the given areas), corner at pixel (1, 223).
flat2-original.webp   flat 2 as given.
flat2-blueprint.png   flat 2's annotated plan with the room areas (its overall dimensions do not agree with its areas).

tools/trace.mjs writes <name>.png (turned) and <name>-original.<ext> here for each new flat.
