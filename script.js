$(window).on("load", function() {
    //Setting some variables (model)
    Tone.Transport.bpm.value = 126;
    var playing = false;

    const kick = new Tone.Sampler({
        urls: {
            C4: "kick.wav"
        },
        baseUrl: "./audio/",
    }).toDestination();

    const snare = new Tone.Sampler({
        urls: {
            C4: "snare.wav"
        },
        baseUrl: "./audio/",
    }).toDestination();


    const piano = new Tone.Sampler({
        urls: {
            G4: "piano_G4.wav",
            Bb4: "piano_As4.wav"
        },
        baseUrl: "./audio/",
    }).toDestination();
    
    const bass = new Tone.Sampler({
        urls: {
            G2: "bass_G2.wav"
        },
        baseUrl: "./audio/",
    }).toDestination();

    const hat = new Tone.Sampler({
        urls: {
            G2: "hats.wav"
        },
        baseUrl: "./audio/",
    }).toDestination();

    var G_Bb = ["G4", "Bb4"];
    var F_A = ["F4", "A4"];
    var D_G = ["D4", "G4"];
    var pianoPart = new Tone.Part(function(time, chord) {
        piano.triggerAttackRelease(chord, "8n", time);
    }, [
        ["0:0:0", G_Bb],
        ["0:0:2", G_Bb],
        ["0:1:0", F_A],
        ["0:1:2", F_A],
        ["0:2:0", D_G],
        ["0:2:3", D_G],
        ["0:3:1", D_G],
        ["0:3:3", D_G],
    ]);
    pianoPart.loop = 8;


    const bassPart = new Tone.Part(function(time, note) {
        bass.triggerAttackRelease(note, "8n", time);
    }, [
        ["0:0:0", "G2"],
        ["0:0:2", "G2"],
        ["0:1:0", "F2"],
        ["0:1:2", "F2"],
        ["0:2:0", "Eb2"],
        ["0:2:3", "Eb2"],
        ["0:3:1", "Eb2"],

        ["1:0:0", "Eb2"],
        ["1:0:2", "Eb2"],
        ["1:1:0", "F1"],
        ["1:1:2", "F1"],
        ["1:2:0", "C2"],
        ["1:2:3", "C2"],
        ["1:3:1", "C2"],

        ["2:0:0", "C2"],
        ["2:0:2", "C2"],
        ["2:1:0", "D2"],
        ["2:1:2", "D2"],
        ["2:2:0", "Eb2"],
        ["2:2:3", "Eb2"],
        ["2:3:1", "Eb2"],

        ["3:0:0", "Eb2"],
        ["3:0:2", "Eb2"],
        ["3:1:0", "F1"],
        ["3:1:2", "F1"],
        ["3:2:0", "G1"],
        ["3:2:3", "G1"],
        ["3:3:1", "G1"]
    ]);

    /* Controller */
    function rangeToDb(vol) {
        return 10*Math.log10(vol);
    }

    $(document).on("input", "#kick", function() {
        kick.volume.value = rangeToDb($(this).val());
    });

    $(document).on("input", "#snare", function() {
        snare.volume.value = rangeToDb($(this).val());
    });

    $(document).on("input", "#piano", function() {
        piano.volume.value = rangeToDb($(this).val());
    });

    $(document).on("input", "#bass", function() {
        bass.volume.value = rangeToDb($(this).val());
    });

    $(document).on("input", "#hats", function() {
        hat.volume.value = rangeToDb($(this).val());
    });

    $(document).on("click", "#play", function() {
        if(!playing) {
            var kickLoop = new Tone.Loop(function(time){
                kick.triggerAttackRelease("C4", "8n");
            }, "4n").start(0);
    
            var snareLoop = new Tone.Loop(function(time){
                snare.triggerAttackRelease("C4", "8n");
            }, "2n").start("4n");

            var hatsLoop = new Tone.Loop(function(time){
                hat.triggerAttackRelease("C4", "8n");
            }, "8n").start(0);
    
            var pianoLoop = new Tone.Loop(function(time) {
                pianoPart.start(time);
            }, "1n").start("16m");
    
            var bassLoop = new Tone.Loop(function(time) {
                bassPart.start(time);
            }, "1n").start("16m");
        
            Tone.Transport.start();
            playing = true;
        }
    });

    $(document).on("click", "#stop", function() {
        playing = false;
        Tone.Transport.stop();
    });
});