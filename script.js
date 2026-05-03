const scriptURL = 'https://script.google.com/macros/s/AKfycbwwoofCO-EJFkBxQyTjrj_IscT5HliIoYIeduo3afIcVUcbzXRzpzLxh2Lnwh6zbo_a/exec'; 

const container = document.getElementById('classroom-map');
let selectedSeat = null;

// 1. ดึงข้อมูลการจองที่มีอยู่แล้วมาแสดงผล (Sync ข้อมูล)
function loadSeats() {
    fetch(scriptURL)
        .then(res => res.json())
        .then(data => {
            data.forEach(row => {
                const seatBtn = document.getElementById('seat-' + row[0]);
                if (seatBtn) {
                    seatBtn.classList.add('taken');
                    seatBtn.innerText = row[1]; // แสดงชื่อคนจองบนที่นั่ง
                }
            });
        });
}

// 2. สร้างที่นั่ง 25 ที่
for (let i = 1; i <= 25; i++) {
    const seat = document.createElement('button');
    seat.innerText = i;
    seat.id = 'seat-' + i;
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

// เรียกโหลดข้อมูลตอนเปิดหน้าเว็บ
loadSeats();

// 3. ฟังก์ชันกดยืนยันการจอง
function confirmBooking() {
    const name = document.getElementById('student-name').value;
    if (selectedSeat && name) {
        const seatNumber = selectedSeat.innerText;
        
        // ส่งข้อมูลไปที่ Google Sheets
        fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify({ seat: seatNumber, name: name })
        })
        .then(() => {
            alert('จองสำเร็จ! ข้อมูลบันทึกลง Google Sheets แล้ว');
            location.reload(); // รีเฟรชหน้าเพื่ออัปเดตสถานะ
        })
        .catch(error => console.error('Error!', error.message));
        
    } else {
        alert('กรุณาเลือกที่นั่งและใส่ชื่อด้วยครับ');
    }
}
