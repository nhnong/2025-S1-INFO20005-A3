// product quantity incrementor 
function changequantity(amount) {
  const input = document.getElementById("quantityinput");
  let newValue = parseInt(input.value) + amount;
  if (newValue < 1) newValue = 1;
  input.value = newValue;
}

// product image change on thumbnail click
function changeMainImage(thumbnail) {
    const container = thumbnail.closest('.images'); // find parent container
    const mainImage = container.querySelector('.productimage'); 
    mainImage.src = thumbnail.src;
}

// product size button color change on click
function changeButtonColor(button, optionsDiv) {
    const target = document.getElementById(button)
    
    const buttons = optionsDiv.querySelectorAll('.productsizebuttonclicked');
    // Reset all buttons to default color
    buttons.forEach(btn => btn.classList.remove('productsizebuttonclicked'));
    buttons.forEach(btn => btn.classList.add('productsizebutton'));

    // Add clicked color to the selected button
    target.classList.add('productsizebuttonclicked');
}

// record of products
const products = {
  // fluid bear
  product1: {
    title: "DIY Fluid Bear Painting Kit",
    image: "photobearsize.jpg",
    description: "Price varies by size",
    price: "$50.00",
    options: [
      { size: "18cm", price: "$50" },
      { size: "23cm", price: "$75" },
      { size: "30cm", price: "$100" },
      { size: "53cm", price: "$150" },
      { size: "100cm", price: "$500" }
    ],
    extraImages: [
      "photoproduct2.jpg",
      "photoproduct3.jpg"
    ],
    differentPrices: true
  },
  // fluid melody
  product2: {
    title: "DIY Fluid Melody Kit",
    image: "photoproduct4.png",
    description: "23cm",
    price: "$75.00"
  },

  // fluid kuromi
  product3: {
    title: "DIY Fluid Kuromi Kit",
    image: "photoproduct1.jpg",
    description: "23cm",
    price: "$75.00"
  },

  // fluid balloon do
  product4: {
    title: "DIY Fluid Balloon Dog Kit",
    image: "photoproduct5.png",
    description: "23cm",
    price: "$75.00"
  },

  // decoden kits phone
  product5: {
    title: "DIY Decoden Phone Case Kit",
    image: "photoproduct8phonecase.webp",
    description: "Available for iPhone cases",
    price: "$65.00",
    options: [
      { name: "iPhone 11", price: "$65.00" },
      { name: "iPhone 12", price: "$65.00" },
      { name: "iPhone 13", price: "$65.00" },
      { name: "iPhone 14", price: "$65.00" },
      { name: "iPhone 15", price: "$65.00" }
    ],
    colours: [
      { name: "Pink", hex: "#FF69B4" },
      { name: "Blue", hex: "#1E90FF" },
      { name: "Purple", hex: "#9370DB" },
      { name: "Green", hex: "#32CD32" }
    ]
  },
  // decoden kits airpod
  product6: {
    title: "DIY Decoden Airpod Case Kit",
    image: "photoproduct9airpod.jpeg",
    description: "Available for AirPods (3rd Gen)",
    price: "$35.00",
    options: [
      { name: "AirPods (3rd Gen)", price: "$35.00" },
      { name: "AirPods Pro", price: "$35.00" }
    ],
    colours: [
      { name: "Pink", hex: "#FF69B4" },
      { name: "Blue", hex: "#1E90FF" },
      { name: "Purple", hex: "#9370DB" },
      { name: "Green", hex: "#32CD32" }
    ]
  },
  // decoden kits mirror
  product7: {
    title: "DIY Decoden Brush Mirror Kit",
    image: "photoproduct7.webp",
    description: "7cm",
    price: "$35.00",
    colours: [
      { name: "Pink", hex: "#FF69B4" },
      { name: "Blue", hex: "#1E90FF" },
      { name: "Purple", hex: "#9370DB" },
      { name: "Green", hex: "#32CD32" }
    ]
  },
  // decoden kits hand mirror
  product8: {
    title: "DIY Decoden Hand Mirror Kit",
    image: "photoproductdecodenhandmirror.webp",
    description: "7cm",
    price: "$35.00",
    colours: [
      { name: "Pink", hex: "#FF69B4" },
      { name: "Blue", hex: "#1E90FF" },
      { name: "Purple", hex: "#9370DB" },
      { name: "Green", hex: "#32CD32" }
    ]
  },
  // decoden kits frame
  product9: {
    title: "DIY Decoden Mirror Kit",
    image: "photoproduct10decodenframe.jpg",
    description: "Available in 3 styles",
    price: "$80.00",
    options: [
      { name: "Rectangle 20cm", price: "$80.00" },
      { name: "Circle 20cm", price: "$80.00" },
      { name: "Wavy 20cm", price: "$80.00" }
    ],
    colours: [
      { name: "Pink", hex: "#FF69B4" },
      { name: "Blue", hex: "#1E90FF" },
      { name: "Purple", hex: "#9370DB" },
      { name: "Green", hex: "#32CD32" }
    ]
  }
};


function selectProducts(productId) {
  localStorage.setItem("selectedProduct", productId);
}

// showing matching products on click
function matchProducts(productId) {
  const product = products[productId];
  if (!product) return;

  const title = document.getElementById("productpagetitle");
  const image = document.getElementById("productpageimage");
  const price = document.getElementById("productpageprice");
  // const optionsDiv = document.getElementById("product-options");

  if (title) title.textContent = product.title;
  if (image) image.src = product.image;
  if (price) price.textContent = product.price;
  if (product.extraImages) {
    const thumbnail1 = document.getElementById("thumbnail1");
    const thumbnail2 = document.getElementById("thumbnail2");
    const thumbnail3 = document.getElementById("thumbnail3");
    thumbnail1.src = product.image;
    thumbnail2.src = product.extraImages[0];
    thumbnail3.src = product.extraImages[1];
  }
  else {
    //get element by class
    const thumbnails = document.querySelectorAll('.productthumbnail');
    thumbnails.forEach(thumbnail => {
      thumbnail.style.display = 'none'; 
    });
  }

  if (product.options) {
    const optiontext = 'Options';
    displayOptions(product.options, product, productId, optiontext);
  }

  if (product.colours) {
    const colourtext = 'Colours';
    displayOptions(product.colours, product, productId, colourtext);
  }

}

function displayOptions(options, product, productId, text) {
    const beforeOptions = document.getElementById("productpageoptions")

    const optionsDiv = document.createElement("div");

    optionsDiv.style.justifyContent = "flex-start" // Show the options div
    optionsDiv.className = "productoptions";
    
    const optionsTitle = document.createElement("p");
    optionsTitle.innerHTML = `Available ${text}:<br/>`;
    optionsTitle.className = "eightpx";
    
    beforeOptions.appendChild(optionsTitle);
    beforeOptions.appendChild(optionsDiv);

    options.forEach(option => {
      const button = document.createElement("button");
      button.className = "productsizebutton";

      if (product.differentPrices){
        button.textContent = `${option.size} - ${option.price}`;
        button.id = 'button'+productId+option.size; // Set the button ID to the size
      }
      else {
        button.textContent = `${option.name}`;
        button.id = 'button'+productId+option.name; // Set the button ID to the name
      }

      if (options[0] == option) {
        button.classList.add('productsizebuttonclicked'); // Add clicked color to the first option
      }

      button.style.marginBottom = "5px"; 

      button.onclick = function() {
        changeButtonColor(this.id, optionsDiv);
        const priceElement = document.getElementById("productpageprice");
        if (product.differentPrices) {
          priceElement.textContent = option.price;
        }
      };

      optionsDiv.appendChild(button);
    });

}

window.onload = function () {
  const productId = localStorage.getItem("selectedProduct");
  if (productId) matchProducts(productId);
};