# Essential Stuff

## Html import links

Google font

``` html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

Ionicon

``` html
<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
```

---

## Colors

### Background color

``` css
--bg-white: hsla(0, 0%, 100%, 1);
--bg-light-sand: hsla(38, 40%, 95%, 1);
--bg-stone-gray: hsla(210, 5%, 80%, 1);
--bg-deep-sea: hsla(210, 25%, 35%, 1);
--bg-sky-blue: hsla(190, 20%, 55%, 1);
--bg-accent-gold: hsla(35, 30%, 70%, 1);
--bg-roman-silver-alpha-30: hsla(210, 9%, 57%, 0.3);
```

### Text color

``` css
--text-deep-sea: hsla(210, 30%, 20%, 1);
--text-sky-blue: hsla(190, 20%, 55%, 1);
--text-dark-stone: hsla(210, 11%, 15%, 1);
--text-black: hsla(270, 100%, 0%, 1);
```

### Border color

``` css
--border-dark-stone: hsla(210, 11%, 15%, 1);
--border-deep-sea: hsla(210, 25%, 35%, 1);
```

## Typography

``` css
--fontFamily-inter: 'Inter', sans-serif;
--fontFamily-clashDisplay: 'ClashDisplay', cursive;

--fontSize-1: 6.2rem;
--fontSize-2: 4.4rem;
--fontSize-3: 3.8rem;
--fontSize-4: 3.4rem;
--fontSize-5: 3rem;
--fontSize-6: 2.5rem;
--fontSize-7: 2rem;
--fontSize-8: 1.8rem;
--fontSize-9: 1.4rem;
--fontSize-10: 2.4rem;
--fontSize-11: 1.2rem;

--weight-semiBold: 600;
```

## Shadow

``` css
--shadow-1: 0 4px 6px hsla(210, 11%, 15%, 0.1);
--shadow-2: 4px 4px 0px var(--border-dark-stone);
--shadow-3: 2px 2px 0px var(--border-dark-stone);
```

## Transition

``` css
--transition-1: 250ms ease;
--transition-2: 500ms ease;
```
