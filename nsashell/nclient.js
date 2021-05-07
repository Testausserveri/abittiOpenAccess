const readline = require('readline');
const net = require("net");
const client = new net.Socket();
console.log("Connecting to KTP...")
client.on('close', function() {
    console.log('Connection to KTP closed.');
    process.exit(0)
})
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '?'
})
let mem = {
    env: "",
    dir: "/"
}
let cli = async () => {
    rl.on('line', (input) => {
        if(input == "exit"){
            client.destroy()
            process.exit(0)
        }else {
            console.log("...")
            let c = ""
            let handle = async () => {
                if(c.endsWith('"end":0}')){ // We know there is no more data
                    process.stdout.moveCursor(null, -1)
                    process.stdout.clearLine()
                    process.stdout.cursorTo(0)
                    let json = JSON.parse(c)
                    if(json.error == null && json.stderr == ""){
                        // No errors
                        // Parse internal stuff out
                        json.stdout = json.stdout.trim()
                        json.stdout = json.stdout.split("-!&!-")
                        let env = json.stdout[1].trim().split("\n")
                        for(let i = 0; i < env.length; i++){
                            if(env[i].endsWith("=") || env[i].trim() == ""){
                                env[i] = ""
                            }else {
                                env[i] = env[i].split("=")
                                env[i][0] = "export " + env[i][0] + '="'
                                env[i][env[i].length-1] = env[i][env[i].length-1] + '"'
                                env[i] = env[i].join("=").replace("=\"=", "=\"")
                            }
                        }
                        mem.env = env.join("\n").trim().split("\n").join(" && ")
                        json.stdout = json.stdout[0].trim().split("\n")
                        mem.dir = json.stdout[json.stdout.length-3]
                        rl.setPrompt("\x1b[32m" + json.stdout[json.stdout.length-2].trim() + "@" + json.stdout[json.stdout.length-1].trim() + "\x1b[0m:\x1b[34m" + mem.dir + "\x1b[0m$ ")
                        json.stdout.splice(json.stdout.length-3, 3)
                        json.stdout = json.stdout.join("\n")
                        // Log to console like normal
                        process.stdout.write(json.stdout + "\n")
                    }else {
                        process.stdout.write("Failed:\n" + json.error + "\n" + json.stderr)
                    }
                    rl.prompt();
                }
            }
            client.once("data", async data => {
                c += data.toString()
                handle()
            })
            client.write("cd " + mem.dir + " && " + (mem.env != "" ? (mem.env + " && ") : "") + input + " && pwd && whoami && hostname && echo \"-!&!-\" && printenv#33#") // Special end!
        }
    })
    rl.prompt()
}
client.connect(process.argv[3] || 4133, process.argv[2] || '0.0.0.0', function() {
    console.log('Socket connected, waiting for status packets...');
    client.once("data", async data => {
        let json = JSON.parse(data.toString())
        if(json.error == null && json.stderr == ""){
            // No errors
            json.stdout = json.stdout.split("\n")
            rl.setPrompt("\x1b[32m" + json.stdout[0].trim() + "@" + json.stdout[1].trim() + "\x1b[0m:\x1b[34m" + mem.dir + "\x1b[0m$ ")
            json.stdout.splice(0, 2)
            // Fix empty fields and add tags
            for(let i = 0; i < json.stdout.length; i++){
                if(json.stdout[i].endsWith("=") || json.stdout[i].trim() == ""){
                    json.stdout[i] = ""
                }else {
                    json.stdout[i] = json.stdout[i].split("=")
                    json.stdout[i][0] = "export " + json.stdout[i][0] + '="'
                    json.stdout[i][json.stdout[i].length-1] = json.stdout[i][json.stdout[i].length-1] + '"'
                    json.stdout[i] = json.stdout[i].join("=").replace("=\"=", "=\"")
                }
            }
            json.stdout = json.stdout.join("\n").trim().split("\n").join(" && ")
            mem.env = json.stdout
            console.log("Connection ready!")
            cli()
        }else {
            console.log("Failed:\n" + json.error + "\n" + json.stderr)
        }
    })
    client.write("whoami && hostname && printenv#33#")
})
