const injectButton = () => {
    const button = document.createElement("button");

    button.innerText = "Add to instance";

    button.style.width = "100%";
    button.style.padding = "15px";
    button.style.marginTop = "10px";

    button.style.backgroundColor = "#B3CAE5";
    button.style.color = "black";

    button.style.borderRadius = "5px";

    document.querySelector(".project__header__content").appendChild(button);
}