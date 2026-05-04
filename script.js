const scriptURL = 'https://script.google.com/macros/s/AKfycbyJhKFDX3x8rFdbSgzIwXGaxC-5A_zuUBkCl_dx07jgoeWtp86zvfEB_jLI9OCcahkH/exec'; 
const container = document.getElementById('classroom-map');
let selectedSeat = null;

function createSeats() {
    container.innerHTML = ''; 
    
    // ฟังก์ชันช่วยสร้างปุ่ม
    function addSeat(id) {
        const seat = document.createElement('button');
        seat.innerText = id;
        seat.id = 'seat-' + id;
        seat.classList.add('seat');
        seat.onclick = () => {
            if (!seat.classList.contains('taken')) {
                if (selectedSeat) selectedSeat.classList.remove('selected');
                seat.classList.add('selected');
                selectedSeat = seat;
            }
        };
        container.appendChild(seat);
    }

    // ฟังก์ชันช่วยสร้างช่องว่าง (ทางเดิน)
    function addAisle() {
        const aisle = document.createElement('div');
        aisle.classList.add('aisle');
        container.appendChild(aisle);
    }

    // --- แถวที่ 1 (3-3-3-3) ---
    let seatNum = 1;
    for (let group = 1; group <= 4; group++) {
        for (let s = 1; s <= 3; s++) { addSeat(seatNum++); }
        if (group < 4) addAisle(); // เว้นทางเดินยกเว้นกลุ่มสุดท้าย
    }

    // --- แถวที่ 2-4 (2-2-2-2) ---
    for (let row = 1; row <= 3; row++) {
        for (let group = 1; group <= 4; group++) {
            // สร้างที่นั่ง 2 ตัว
            for (let s = 1; s <= 2; s++) { addSeat(seatNum++); }
            // สร้างที่ว่างหลอกๆ 1 ตัว (เพื่อให้ทางเดินตรงกับแถวบน)
            const spacer = document.createElement('div');
            spacer.style.width = '50px'; // เท่ากับความกว้างที่นั่ง
            container.appendChild(spacer);
            
            if (group < 4) addAisle();
        }
    }
}

// ... ส่วนฟังก์ชัน loadSeats และ confirmBooking ก๊อปของเดิมมาวางต่อท้ายได้เลยครับ ...
createSeats();
loadSeats();

