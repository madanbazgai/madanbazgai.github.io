---
title: "Django Crash Course"
date: 2022-09-04T13:49:12+05:45
draft: false
# weight: 1
# aliases: ["/first"]
categories: ["Web Development"]
tags: ["python", "pinned"]
author: "Madan Bazgai"
showToc: true
description: "Desc Text."
canonicalURL: "https://canonical.url/to/page"
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: false
cover:
  image: "images/posts/img3.jpg" # image path/url
  alt: "django crash course" # alt text
  caption: "django crash course" # display caption under cover
  relative: false # when using page bundles set this to true
  hidden: false # only hide on current single page
editPost:
  URL: "https://github.com/madanbajgai/content"
  Text: "Click here to Suggest Changes" # edit text
  appendFilePath: true # to append file path to Edit link
---

Lorem markdownum fine incustoditam unda factura versum occuluere Aeneas, iuvat
haec praepes [partes epulae](http://cui.com/), in egisse de. Caecisque ter
manus. Munere in exhalat, ferre sed [habe quaeque saepe](http://ne.org/fretum)
verba caput ferarum _nubila_? Patriam Cyparisse tamen, **saxum** fide postponere
pavida ne omnes etiam, atque. Sonuit omina sed sine haerebat illic fit a mora
in.

1. Serrae enim Etruscam aquis
2. Et premis et flumine frontem minatur oppressos
3. Inquam rector Icarus possum vim tumulo propiusque
4. Vulnus se Latreus
5. Aptumque bis

## Turpius Aegides membris colat volentes fallere

Ille fida formosus, et addunt viscera perdidit ad pondere quia tellus
consequitur et quoque scinditque in. Ratis laborum instabat quaedam partem
Phoebus, manus _partibus poenas_. Sola armos adhuc; chaos agit ora manifesta
procul fugitque corpora iugales!

    package main

      import (
      "fmt"
      "math/rand"
      "time"
      )

      type Moo struct {
      Cow int
      Sound string
      Tube chan bool
      }

      // A cow will moo until it is being fed
      func cow(num int, mootube chan Moo) {
      tube := make(chan bool)
      for {
      select {
      case mootube <- Moo{num, "moo", tube}:
      fmt.Println("Cow number", num, "mooed through the mootube")
      <-tube
      fmt.Println("Cow number", num, "is being fed and stops mooing")
      mootube <- Moo{num, "mooh", nil}
      fmt.Println("Cow number", num, "moos one last time out of happyness")
      return
      default:
      fmt.Println("Cow number", num, "mooed through the mootube and was ignored")
      time.Sleep(time.Duration(rand.Int31n(1000)) \* time.Millisecond)
      }
      }
      }

      // The farmer wants to put food in all the mootubes to stop the mooing
      func farmer(numcows int, mootube chan Moo, farmertube chan string) {
      fmt.Println("Farmer starts listening to the mootube")
      for hungryCows := numcows; hungryCows > 0; {
      moo := <-mootube
      if moo.Sound == "mooh" {
      fmt.Println("Farmer heard a moo of relief from cow number", moo.Cow)
      hungryCows--
      } else {
      fmt.Println("Farmer heard a", moo.Sound, "from cow number", moo.Cow)
      time.Sleep(2e9)
      fmt.Println("Farmer starts feeding cow number", moo.Cow)
      moo.Tube <- true
      }
      }
      fmt.Println("Farmer doesn't hear a single moo anymore. All done!")
      farmertube <- "yey!"
      }

      // The farm starts out with mooing cows that wants to be fed
      func runFarm(numcows int) {
      farmertube := make(chan string)
      mootube := make(chan Moo)
      for cownum := 0; cownum < numcows; cownum++ {
      go cow(cownum, mootube)
      }
      go farmer(numcows, mootube, farmertube)
      farmerSaid := <-farmertube
      if farmerSaid == "yey!" {
      fmt.Println("All cows are happy.")
      }
      }

      func main() {
      runFarm(4)
      fmt.Println("done")
      }

## O contra diu

Descendit _auras cum misi_ contactu tenax lacus, **quaerensque invitum
premuntur** patria. Puris ille pictis spiritus placent vestigia et noctis
sceleratos laudis egere retroque. Patrem contenta magni margine satis inprudens
nymphae invito verba saepe: genus sed numinis pugnat meum iterumque attonitas
rursus utve. Constituit praestet liceat opprobria Medusae huius, excutiuntque
nam nil, pariter.

Coma **laudes manet** ausus hortaturque matrisque Veneris proximus tu iamque
aptius claudit. Tmolus tetigere iussos animumque quid poplite Hippotaden? Quod
sibi Spartana sidera, lupum Nereusque quoque ramum, vertuntur Peleus Amuli
oscula: tamen. Surgere Epidaurius movit crede soceri Euboicam quoque.

Unde stabant, acuta, percussit denique; hoc illic et herbis minimas parvum? Quid
_gemino profectus et_ dici postquam tot; aquarum quod relanguit est si
quodcumque. Ossaque protinus, quod somno est, repetit, hoc passu est. Qui devia;
respice humum vobis oscula, in Lotis nymphae.

Dolet certamina velle dexteriore mutatus saepe, tellure ubi unguibus, gestu.
Illis cuius finem Sirenes adsueta stridore, pictas quo edidit, nec utque et
capillos ego rapi Bootes, sculpsit. Protinus sibi denique sibi primum Acheloides
ante exspectant gaudeat Calydonius cernit, duxit pariterque dolet epulis? Nostri
visae nisi aeripedes stant quem saepibus cannis protectus candens praestet:
porrigar **patriam** Alcmene: attonitas.
