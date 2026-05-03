// script.js
const container = document.getElementById('classroom-map');
let selectedSeat = null;

// สร้างที่นั่ง 25 ที่
for (let i = 1; i <= 25; i++) {
    const seat = document.createElement('button');
    seat.innerText = i;
    seat.classList.add('seat');
    
    seat.onclick = () => {
        if (!seat.classList.contains('taken')) {
            // เคลียร์การเลือกอันเก่า
            if (selectedSeat) selectedSeat.classList.remove('selected');
            // เลือกอันใหม่
            seat.classList.add('selected');
            selectedSeat = seat;
        }
    };
    container.appendChild(seat);
}

function confirmBooking() {
    const name = document.getElementById('student-name').value;
    if (selectedSeat && name) {
        alert(`ยืนยันการจองที่นั่งที่ ${selectedSeat.innerText} ให้คุณ ${name}`);
        selectedSeat.classList.add('taken');
        selectedSeat.classList.remove('selected');
        // ตรงนี้ต้องส่งข้อมูลไปเก็บใน Database (ดูขั้นตอนถัดไป)
    } else {
        alert('กรุณาเลือกที่นั่งและใส่ชื่อด้วยครับ');
    }
}