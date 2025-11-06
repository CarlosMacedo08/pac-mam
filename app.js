document.addEventListener("DOMContentLoaded", () => {
    const scoreDisplay = document.getElementById("score")
    const levelDisplay = document.getElementById("level")
    const width = 28
    let score = 0
    let level = 1
    let currentLayout = null
    let pacDotsRemaining = 0
    const grid = document.querySelector(".grid")
    const levelSelect = document.getElementById('level-select')
    const setLevelBtn = document.getElementById('set-level')

    const layout = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]

    // generate layout per level: create small variations so maze changes by phase
    function getLayoutForLevel(lvl) {
        // simple strategy: copy base and remove a few walls depending on level
        const copy = layout.slice()
        const rng = (n) => Math.floor(Math.abs(Math.sin(n + lvl) * 10000) % copy.length)
        // remove some walls to open paths: number of removals = min(10, lvl*2)
        const removals = Math.min(10, lvl * 2)
        for (let i = 0; i < removals; i++) {
            const idx = rng(i)
            if (copy[idx] === 1) copy[idx] = 4 // make it empty
        }
        // shift some power-pellets slightly
        for (let i = 0; i < copy.length; i++) {
            if (copy[i] === 3 && lvl % 2 === 0) copy[i] = 0
        }
        return copy
    }

    // 0 - pac-dots
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty

    const squares = []

    //create your board
    function createBoard() {
        // optionally use layout per level
        const usingLayout = currentLayout || layout
        for (let i = 0; i < usingLayout.length; i++) {
            const square = document.createElement("div")
            square.id = i
            grid.appendChild(square)
            squares.push(square)

            //add layout to the board
            if (usingLayout[i] === 0) {
                squares[i].classList.add("pac-dot")
            }
            if (usingLayout[i] === 1) {
                squares[i].classList.add("wall")
            }
            if (usingLayout[i] === 2) {
                squares[i].classList.add("ghost-lair")
            }
            if (usingLayout[i] === 3) {
                squares[i].classList.add("power-pellet")
            }
        }
        // update pac-dot count after building
        pacDotsRemaining = squares.filter(s => s.classList && s.classList.contains('pac-dot')).length
    }
    // if starting level > 1, generate layout for it
    currentLayout = getLayoutForLevel(level)
    createBoard()

    //create Characters
    // draw pac-man onto the board
    let pacmanCurrentIndex = 490
    let pacmanDirection = 'left' // left, right, up, down
    let pacChompInterval = null
    function drawPacman() {
        squares[pacmanCurrentIndex].classList.add("pac-man")
        // set directional classes for mouth
        squares[pacmanCurrentIndex].classList.remove('dir-left','dir-right','dir-up','dir-down')
        squares[pacmanCurrentIndex].classList.add('dir-' + pacmanDirection)
        // mouth state handled by chomp interval; ensure class present state unchanged here
    }
    drawPacman()

    function startPacChomp() {
        stopPacChomp()
        pacChompInterval = setInterval(() => {
            if (!squares[pacmanCurrentIndex]) return
            squares[pacmanCurrentIndex].classList.toggle('mouth-open')
        }, 180)
    }

    function stopPacChomp() {
        if (pacChompInterval) { clearInterval(pacChompInterval); pacChompInterval = null }
    }

    // start chomping
    startPacChomp()

    //move pacman
    function movePacman(e) {
        squares[pacmanCurrentIndex].classList.remove("pac-man")
        squares[pacmanCurrentIndex].classList.remove('mouth-open')
        // switch (e.keyCode) { deprecated
        switch (e.key) {
            // case 37:
            case "ArrowLeft":
                if (
                    pacmanCurrentIndex % width !== 0 &&
                    !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
                ) {
                    pacmanCurrentIndex -= 1
                    pacmanDirection = 'left'
                }
                if ((pacmanCurrentIndex - 1) === 363) {
                    pacmanCurrentIndex = 391
                }
                break
            case "ArrowUp":
                // case 38:
                if (
                    pacmanCurrentIndex - width >= 0 &&
                    !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")

                ) {
                    pacmanCurrentIndex -= width
                    pacmanDirection = 'up'
                }
                break
            case "ArrowRight":
                // case 39:
                if (
                    pacmanCurrentIndex % width < width - 1 &&
                    !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
                ) {
                    pacmanCurrentIndex += 1
                    pacmanDirection = 'right'
                }
                if (
                    (pacmanCurrentIndex + 1) === 392
                ) {
                    pacmanCurrentIndex = 364
                }
                break
            case "ArrowDown":
                // case 40:
                if (
                    pacmanCurrentIndex + width < width * width &&
                    !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")
                ) {
                    pacmanCurrentIndex += width
                    pacmanDirection = 'down'
                }
                break
        }
        drawPacman()
        pacDotEaten()
        powerPelletEaten()
        checkForGameOver()
        checkForWin()
    }

    document.addEventListener("keyup", movePacman)

    // touch controls
    const controls = document.getElementById('touch-controls')
    if (controls) {
        controls.querySelector('.up').addEventListener('click', () => moveFromTouch('ArrowUp'))
        controls.querySelector('.down').addEventListener('click', () => moveFromTouch('ArrowDown'))
        controls.querySelector('.left').addEventListener('click', () => moveFromTouch('ArrowLeft'))
        controls.querySelector('.right').addEventListener('click', () => moveFromTouch('ArrowRight'))
    }
    function moveFromTouch(key) {
        movePacman({ key })
    }

    //what happens when you eat a pac-dot
    function pacDotEaten() {
        if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
            score++
            scoreDisplay.innerHTML = score
            squares[pacmanCurrentIndex].classList.remove("pac-dot")
            pacDotsRemaining--
            if (pacDotsRemaining <= 0) nextLevel()
        }
        // advance automatically when score threshold reached
        if (score >= 250) {
            // show congrats and move to next phase
            showMessage(`Parabéns! Você completou a fase ${level}`)
            // schedule next phase
            setTimeout(() => {
                // increase level and rebuild with new layout
                level++
                levelDisplay.innerText = level
                currentLayout = getLayoutForLevel(level)
                applyLevelSpeeds(level)
                // rebuild board
                ghosts.forEach(ghost => clearInterval(ghost.timerId))
                grid.innerHTML = ''
                squares.length = 0
                createBoard()
                pacmanCurrentIndex = 490
                pacmanDirection = 'left'
                drawPacman()
                ghosts.forEach(ghost => { ghost.currentIndex = ghost.startIndex; addGhostToSquare(ghost) })
                ghosts.forEach(ghost => moveGhost(ghost))
            }, 1400)
        }
    }

    //what happens when you eat a power-pellet
    function powerPelletEaten() {
        if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
            score += 10
            scoreDisplay.innerHTML = score
            ghosts.forEach(ghost => ghost.isScared = true)
            // scared duration
            const scaredDuration = 10000
            // start blink near the end (last 3s)
            const blinkStart = 3000
            // clear any previous timers
            clearTimeout(window._unscareTimer)
            clearTimeout(window._blinkTimer)
            window._blinkTimer = setTimeout(() => {
                // make ghosts blink
                ghosts.forEach(g => {
                    const sq = squares[g.currentIndex]
                    if (sq) sq.classList.add('blink')
                })
                // Pac-Man starts flashing too
                const pSq = squares[pacmanCurrentIndex]
                if (pSq) pSq.classList.add('flash')
            }, scaredDuration - blinkStart)
            window._unscareTimer = setTimeout(() => unScareGhosts(), scaredDuration)
            squares[pacmanCurrentIndex].classList.remove("power-pellet")
        }
    }

    //make the ghosts stop flashing
    function unScareGhosts() {
        ghosts.forEach(ghost => ghost.isScared = false)
        // remove blink/flash classes
        ghosts.forEach(g => {
            const sq = squares[g.currentIndex]
            if (sq) sq.classList.remove('blink')
        })
        const pSq = squares[pacmanCurrentIndex]
        if (pSq) pSq.classList.remove('flash')
        // clear timers
        clearTimeout(window._blinkTimer)
        clearTimeout(window._unscareTimer)
    }

    function nextLevel() {
        // clear intervals
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        // clear scared state and timers
        unScareGhosts()
        // increment level
        level++
        levelDisplay.innerText = level
        // apply new speeds according to level
        applyLevelSpeeds(level)
        // increase ghost speed slightly
        // timers will be restarted with new speeds
        // rebuild board but keep score
        setTimeout(() => {
            grid.innerHTML = ''
            squares.length = 0
            createBoard()
            // reset pacman and ghosts
            pacmanCurrentIndex = 490
            pacmanDirection = 'left'
            drawPacman()
            startPacChomp()
            ghosts.forEach(ghost => { ghost.currentIndex = ghost.startIndex; addGhostToSquare(ghost) })
            ghosts.forEach(ghost => moveGhost(ghost))
        }, 600)
    }

    // message overlay
    const messageOverlay = document.getElementById('message')
    const messageText = document.getElementById('message-text')
    function showMessage(text) {
        if (!messageOverlay || !messageText) return
        messageText.innerText = text
        messageOverlay.classList.add('show')
        messageOverlay.setAttribute('aria-hidden', 'false')
        setTimeout(() => {
            messageOverlay.classList.remove('show')
            messageOverlay.setAttribute('aria-hidden', 'true')
        }, 1200)
    }

    //create ghosts using Constructor
    class Ghost {
        constructor(className, startIndex, speed) {
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.baseSpeed = speed
            this.currentIndex = startIndex
            this.isScared = false
            this.timerId = NaN
            this.direction = 1

        }
    }

    //all my ghosts
    const ghosts = [
        new Ghost("blinky", 348, 250),
        new Ghost("pinky", 376, 400),
        new Ghost("inky", 351, 300),
        new Ghost("clyde", 379, 500),
    ]

    // apply aggressive mode: all ghosts target Pac-Man directly (more brutish)
    function setAggressiveGhosts() {
        ghosts.forEach(ghost => {
            // reduce decision randomness by setting their logic to always target Pac-Man
            ghost.aiMode = 'aggressive'
        })
    }

    // apply level multiplier to ghost speeds
    function applyLevelSpeeds(lvl) {
        // increase speed by 1% per level (i.e., interval time *= 0.99^(lvl-1))
        const factor = Math.pow(0.99, Math.max(0, lvl - 1))
        ghosts.forEach(ghost => {
            ghost.speed = Math.max(40, Math.floor(ghost.baseSpeed * factor))
        })
    }

    // helpers to render ghosts with eyes/pupils
    function createEyesElement(ghost) {
        const eyes = document.createElement('div')
        eyes.className = 'eyes'
        const left = document.createElement('div')
        left.className = 'pupil left'
        const right = document.createElement('div')
        right.className = 'pupil right'
        eyes.appendChild(left)
        eyes.appendChild(right)
        return eyes
    }

    function directionFromDelta(d) {
        if (d === 1) return 'right'
        if (d === -1) return 'left'
        if (d === width) return 'down'
        if (d === -width) return 'up'
        return 'left'
    }

    function addGhostToSquare(ghost) {
        const sq = squares[ghost.currentIndex]
        sq.classList.add(ghost.className, 'ghost')
        // add direction class for eyes
        const dir = directionFromDelta(ghost.direction || -1)
        sq.classList.remove('dir-left','dir-right','dir-up','dir-down')
        sq.classList.add('dir-' + dir)
        if (!sq.querySelector('.eyes')) {
            sq.appendChild(createEyesElement(ghost))
        }
    }

    function removeGhostFromSquare(ghost) {
        removeGhostFromIndex(ghost.currentIndex, ghost.className)
    }

    function removeGhostFromIndex(index, ghostClass) {
        const sq = squares[index]
        if (!sq) return
        // remove the specific ghost class and visual flags
        sq.classList.remove(ghostClass, 'scared-ghost', 'dir-left','dir-right','dir-up','dir-down')
        // check if any ghost classes remain on this square
        const anyGhostLeft = ['blinky','pinky','inky','clyde'].some(name => sq.classList.contains(name))
        if (!anyGhostLeft) {
            sq.classList.remove('ghost')
            const eyes = sq.querySelector('.eyes')
            if (eyes) sq.removeChild(eyes)
        }
    }

    // draw my ghosts onto the grid (with eyes)
    ghosts.forEach(ghost => addGhostToSquare(ghost))

    //move ghosts (Blinky will try to chase Pac-Man, others random-ish)
    ghosts.forEach(ghost => moveGhost(ghost))

    // make ghosts aggressive by default
    setAggressiveGhosts()

    // set level button handler - apply selected level and restart
    setLevelBtn.addEventListener('click', () => {
        const chosen = parseInt(levelSelect.value || '1', 10)
        level = chosen
        levelDisplay.innerText = level
        // apply speed scaling according to chosen level
        applyLevelSpeeds(level)
        // restart game to apply
        restartGame()
    })

    function moveGhost(ghost) {
        const directions = [-1, 1, width, -width]
        // helper to get opposite direction
        function oppositeOf(d) {
            if (d === 1) return -1
            if (d === -1) return 1
            if (d === width) return -width
            if (d === -width) return width
            return -d
        }
        // helper to get next index ahead given a direction string
        function nextAhead(pos, dirStr) {
            const delta = dirStr === 'left' ? -1 : dirStr === 'right' ? 1 : dirStr === 'up' ? -width : width
            const next = pos + delta
            if (next < 0 || next >= squares.length) return null
            if (squares[next].classList.contains('wall')) return null
            return next
        }

        ghost.direction = ghost.direction || -1
        ghost.timerId = setInterval(function () {
            // determine target based on ghost type
            let target = ghost.startIndex
            if (ghost.isScared) {
                // when scared, target random corner (we'll just wander)
                target = ghost.startIndex
            } else {
                // force all ghosts to target Pac-Man directly (more brutal)
                target = pacmanCurrentIndex
            }

            // possible moves avoiding walls
            const candidates = directions.filter(d => {
                const next = ghost.currentIndex + d
                return next >= 0 && next < squares.length && !squares[next].classList.contains('wall')
            })
            if (candidates.length === 0) return

            // declare chosen early so lair logic can set it
            let chosen = undefined

            // if ghost is in lair, prioritize moves to get out
            if (squares[ghost.currentIndex] && squares[ghost.currentIndex].classList.contains('ghost-lair')) {
                // prefer upward exit, then left/right, then down
                const exitOrder = [-width, -1, 1, width]
                const exitCandidate = exitOrder.find(d => candidates.includes(d))
                if (exitCandidate !== undefined) {
                    chosen = exitCandidate
                }
            }

            // avoid reversing direction unless no other option
            const opp = oppositeOf(ghost.direction)
            let filtered = candidates.filter(d => d !== opp)
            if (filtered.length === 0) filtered = candidates

            // if lair logic already chose, skip selection
            if (chosen === undefined) {
                // choose best move: minimize Manhattan distance to target (unless scared -> random)
                if (ghost.isScared) {
                    chosen = filtered[Math.floor(Math.random() * filtered.length)]
                } else {
                    let bestDist = Infinity
                    filtered.forEach(d => {
                        const next = ghost.currentIndex + d
                        const nx = next % width
                        const ny = Math.floor(next / width)
                        const tx = target % width
                        const ty = Math.floor(target / width)
                        const dist = Math.abs(nx - tx) + Math.abs(ny - ty)
                        if (dist < bestDist) { bestDist = dist; chosen = d }
                    })
                }
            }

            // move ghost using helpers
            const nextIndex = ghost.currentIndex + chosen
            if (nextIndex >= 0 && nextIndex < squares.length) {
                // remove from old square
                const oldIndex = ghost.currentIndex
                const oldSq = squares[oldIndex]
                if (oldSq) {
                    removeGhostFromIndex(oldIndex, ghost.className)
                }
                ghost.currentIndex = nextIndex
                addGhostToSquare(ghost)
                ghost.direction = chosen
            }

            // visual scared state
            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add('scared-ghost')
            }

            // if the ghost is scared and pacman is on it
            if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
                 ghost.isScared = false
                 removeGhostFromSquare(ghost)
                 ghost.currentIndex = ghost.startIndex
                 score += 100
                 scoreDisplay.innerHTML = score
                 addGhostToSquare(ghost)
            }
            checkForGameOver()
        }, ghost.speed)
    }

    //check for a game over
    function checkForGameOver() {
        if (
            squares[pacmanCurrentIndex].classList.contains("ghost") &&
            !squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener("keyup", movePacman)
            setTimeout(function () {
                alert("Game Over")
            }, 500)
        }
    }

    //check for a win - change the winning score to whatever you wish
    function checkForWin() {
        if (score >= 274) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener("keyup", movePacman)
            setTimeout(function () {
                alert("You have WON!")
            }, 500)
        }
    }

    // restart logic
    document.getElementById('restart').addEventListener('click', restartGame)
    function restartGame() {
        // clear grid
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener("keyup", movePacman)
        // clear blink/flash timers and classes
        unScareGhosts()
        grid.innerHTML = ''
        squares.length = 0
        score = 0
        scoreDisplay.innerHTML = score
        // rebuild
        createBoard()
        // reset pacman
        pacmanCurrentIndex = 490
        pacmanDirection = 'left'
        drawPacman()
    // apply speeds based on current level
    applyLevelSpeeds(level)
        stopPacChomp()
        startPacChomp()
        // reset ghosts (use helpers to render eyes)
        ghosts.forEach(ghost => { 
            // remove any lingering intervals
            clearInterval(ghost.timerId)
            // reset position
            ghost.currentIndex = ghost.startIndex
            addGhostToSquare(ghost)
        })
        ghosts.forEach(ghost => moveGhost(ghost))
        document.addEventListener("keyup", movePacman)
    }
})
