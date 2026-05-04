const scriptURL = 'https://script.google.com/macros/s/AKfycbwwoofCO-EJFkBxQyTjrj_IscT5HliIoYIeduo3afIcVUcbzXRzpzLxh2Lnwh6zbo_a/exec'; 
const container = document.getElementById('classroom-map');
let selectedSeat = null;

function createSeats() {
    container.innerHTML = ''; // ล้างค่าเก่าก่อนสร้างใหม่
    
    // สร้างแถวที่ 1 (กลุ่มละ 3 คน, 4 กลุ่ม)
    for (let i = 1; i <= 12; i++) {
        makeButton(i, 'triple');
    }
    
    // สร้างแถวที่ 2-4 (กลุ่มละ 2 คน, 4 กลุ่ม)
    for (let i = 13; i <= 36; i++) {
        makeButton(i, 'double');
    }
}

function makeButton(i, type) {
    const seat = document.createElement('button');
    seat.innerText = i;
    seat.id = 'seat-' + i;
    seat.classList.add('seat', type);
    
    seat.onclick = () => {
        if (!seat.classList.contains('taken')) {
            if (selectedSeat) selectedSeat.classList.remove('selected');
            seat.classList.add('selected');
            selectedSeat = seat;
        }
    };
    container.appendChild(seat);
}

// ฟังก์ชันโหลดข้อมูล (คงเดิมไว้)
function loadSeats() {
    fetch(scriptURL)
        .then(res => res.json())
        .then(data => {
            data.forEach(row => {
                const seatBtn = document.getElementById('seat-' + row[0]);
                if (seatBtn) {
                    seatBtn.classList.add('taken');
                    seatBtn.innerText = row[1];
                }
            });
        });
}

function confirmBooking() {
    const name = document.getElementById('student-name').value;
    if (selectedSeat && name) {
        const seatNumber = selectedSeat.id.replace('seat-', '');
        fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify({ seat: seatNumber, name: name })
        })
        .then(() => {
            alert('จองสำเร็จ!');
            location.reload();
        });
    } else {
        alert('กรุณาเลือกที่นั่งและใส่ชื่อครับ');
    }
}

createSeats();
loadSeats();
