$(document).ready(() => {
    // test code
    // for (let i = 1; i <= 50; i++) {
    //     $("#pluginGrid").append(`
    //         <a class="plugin-card"
    //         data-plugin-name="Test Plugin ${i}"
    //         data-plugin-desc="This is the description for test plugin ${i}."
    //         data-plugin-author="Test Author">
    //             <h2 class="no-margin">Test Plugin ${i} <span class="smalltext gray-text">v1.0.${i}</span></h2>
    //             <p style="font-weight: normal;">This is the description for test plugin ${i}.</p>
    //             <p style="font-style: italic; margin-bottom: 0px;" class="smalltext gray-text">By Test Author</p>
    //         </a>
    //     `);
    // }

    $("#search").on("input", () => {
        const search = $("#search").val().toLowerCase();
        console.log(`Searching for: ${search}`);

        $(".plugin-card").each(function () {
            const name = $(this).data("plugin-name").toLowerCase();
            const desc = $(this).data("plugin-desc").toLowerCase();
            const auth = $(this).data("plugin-author").toLowerCase();

            $(this).toggle(name.includes(search) || desc.includes(search) || auth.includes(search));
        });
    });
});

fetch("https://api.github.com/repos/FireBlade211/System-Manager-Plugins/contents/plugins")
    .then(res => res.json())
    .then(entries => {
        entries.forEach(entry => {
            if (entry.name.substring(entry.name.lastIndexOf(".")).toLowerCase() == ".json") {
                fetch(entry.download_url)
                    .then(res => res.json())
                    .then(json => {
                        const dllName = entry.name.substring(0, entry.name.lastIndexOf("."));
                        $("#pluginGrid").append(`
                            <a class="plugin-card"
                            href="https://raw.githubusercontent.com/FireBlade211/System-Manager-Plugins/refs/heads/main/plugins/${dllName}"
                            download="${dllName}"
                            data-plugin-name="${json.name}"
                            data-plugin-desc="${json.description}"
                            data-plugin-author="${json.author}">
                                <h2 class="no-margin">${json.name} <span class="smalltext gray-text">v${json.version}</span></h2>
                                <p style="font-weight: normal;">${json.description}</p>

                                <p style="font-style: italic; margin-bottom: 0px;" class="smalltext gray-text">By ${json.author}</p>
                            </a>
                        `);
                    });
            }
        });
    });