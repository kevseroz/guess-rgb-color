//easy kısmı seçiliyken play again e basarsak 6 renk atayacaktır. çünkü reset buttonunda 6 renk 
//seçilmek üzere ayarlanmıştır. easy kısmındayken seçili renk alt kısımda olabilir
//++ki bu büyük bir sorundur. bu sorunu ortadan kaldırmak için generate fonksiyonuna++
//yeni bir değer atayıp değeri istadiğimiz yerde değiştirebiliyoruz.
var numSquares = 6;
//burada ilk başta altı rgb renk tanımlamıştık fakat hep aynı renkleri döndüreceği için bu bölüme 
//random renk atayacak bir fonksiyon yazdık
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();
function init(){
  setupModeButtons();
  setupSquares();  
  reset();
}

function setupModeButtons(){
     //iki düğme de neredeyse birbirinin aynısı olduğu için dry kod olmasın diye ikisini bir alanda toplayacağız
  for(var i=0; i<modeButtons.length;i++){
    //düğmeleri önce döngüye soktuk. sonra tek tek event listenere sokacağız 
     modeButtons[i].addEventListener("click", function(){
       //birine tıkladığımızda önce iki düğmeden de bütün sınıfları kaldırıp bastığımız düğmeye++
       //selected sınıfını ekleyecektir.this özelliği ile sadece seçilen butona sınıfı ekler.
       modeButtons[0].classList.remove("selected");
       modeButtons[1].classList.remove("selected");
       this.classList.add("selected");
       //bu kod if else ile yazacağımız uzun kodun değişik bir versiyonudur ancak aynı işi görür
       //basılan düğme eğer easy ise nums ı 3 yap eğer değilse altı yap demektir
       this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
       reset();
   });
 }
}

function setupSquares(){
    for(var i = 0; i<squares.length; i++){

        squares[i].addEventListener("click", function(){
    
           var clickedColor = this.style.backgroundColor;
          //tıklanan renkle seçilen renk aynı mı karşılaştırmak için;
           if(clickedColor === pickedColor){
               messageDisplay.textContent = "Correct";
               //oyun bitince bu button try again yazar. bastığında düğmedeki text değişir
               resetButton.textContent = "Play Again";
               //aşağıda oluşturduğumuz fonksiyonu burada harekete geçirelim
               changeColors(clickedColor);
               //rengi doğru tahmin ettiğimiz zaman h1 fonu da aynı renge çevirelim
               h1.style.backgroundColor = clickedColor;
           }
           else{
               //yanlış seçim yaparsak background body rengine döner bizim gözümüzde kaybolmuş gibi olur
               this.style.backgroundColor = "#232323";
               messageDisplay.textContent = "Try Again";
           }
        });
      }
  }


//reset düğmesine yazdığımız fonksiyonu birden fazla yerde kullanacağımız için ayrı bir fonksiyon
//haline getirelim.
function reset(){
    // bütün rnekleri seç (generat all new colors)
    colors = generateRandomColors(numSquares);
    //arraydan yeni random color seç
    pickedColor = pickColor();
    //reset düğmesine bastığımız zaman ortada yazan correct i de silelim
    messageDisplay.textContent = "";
    //reset buttonundaki play again yazısını new colors olarak değiştir
    resetButton.textContent = "New Colors";
    // üst taraftaki rgb rengini eşleşen renge göre değiştir
    colorDisplay.textContent = pickedColor;
    //karelerin rengini değiştir
    for(var i = 0; i< squares.length; i++){
        if(colors[i]){
            //eğer kareler colors a eşit olursa yani altı tane olursa hepsini görünür yapar
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }
        //aksi takdirde boşta kalan kareleri görünmez yapar
        else {
            squares[i].style.display = "none";
        }
    }
    //h1 in backgroundunu kazanılan renkten eski haline getirir.
    h1.style.backgroundColor = "steelblue";

}

resetButton.addEventListener("click", function(){
    reset();
});




function changeColors(color){
    //bütün kareleri döngüye sokalım
    for(var i = 0; i < squares.length; i++){
        //doğru kare seçildiğinde bütün kareleri seçilen renge dönüştürelim
        squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num){
    //bir array oluşturalım
    arr = []
    //num kadar tekrar etmesini sağlayalım bunun için bir döngü oluşturacağız
    for(var i = 0; i<num; i++){
        //random coloru alıp array içine push edelim
        arr.push(randomColor())
    }
    //bu arrayı return edelim
    return arr;
}

function randomColor(){
    //0-255 arası "red" sayı 
    var r = Math.floor(Math.random() * 256);
    //0-255 arası "green" sayı 
    var g = Math.floor(Math.random() * 256);
    //0-255 arası "blue" sayı 
    var b = Math.floor(Math.random() * 256);
    //bu random seçimleri tek bir yerde toplayarak return edelim
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
