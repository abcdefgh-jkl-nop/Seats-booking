const scriptURL = 'https://script.google.com/macros/s/AKfycbyJhKFDX3x8rFdbSgzIwXGaxC-5A_zuUBkCl_dx07jgoeWtp86zvfEB_jLI9OCcahkH/exec'; 
const container = document.getElementById('classroom-map');
let selectedSeat = null;

function createSeats() {
    container.innerHTML = ''; 
    let seatNum = 1;

    // สร้างทั้งหมด 4 แถวแนวนอนตามรูปวาด
    for (let r = 1; r <= 4; r++) {
        const rowDiv = document.createElement('div');
        rowDiv.style.display = 'flex';
        rowDiv.style.justifyContent = 'center';
        rowDiv.style.marginBottom = '15px'; // ระยะห่างระหว่างแถวหน้า-หลัง
        rowDiv.style.width = '100%';

        // ใน 1 แถวแนวนอน มี 4 กลุ่มหน้ากระดาน
        for (let g = 1; g <= 4; g++) {
            const groupDiv = document.createElement('div');
            groupDiv.style.display = 'flex';
            groupDiv.style.marginRight = (g < 4) ? '40px' : '0'; // ทางเดินระหว่างกลุ่ม

            // เงื่อนไข: ถ้ากลุ่มที่ 1 (ซ้ายสุด) ให้มี 3 ที่นั่ง นอกนั้น 2 ที่นั่ง
            let seatsInGroup = (g === 1) ? 3 : 2;

            for (let s = 1; s <= seatsInGroup; s++) {
                const seat = document.createElement('button');
                seat.innerText = seatNum;
                seat.id = 'seat-' + seatNum;
                seat.classList.add('seat');
                seat.onclick = () => {
                    if (!seat.classList.contains('taken')) {
                        if (selectedSeat) selectedSeat.classList.remove('selected');
                        seat.classList.add('selected');
                        selectedSeat = seat;
                    }
                };
                groupDiv.appendChild(seat);
                seatNum++;
            }
            rowDiv.appendChild(groupDiv);
        }
        container.appendChild(rowDiv);
    }
}

// ฟังก์ชัน loadSeats และ confirmBooking (เหมือนเดิม)
function loadSeats() {
    fetch(scriptURL).then(res => res.json()).then(data => {
        data.forEach(row => {
            const seatBtn = document.getElementById('seat-' + row[0]);
            if (seatBtn) {
                seatBtn.classList.add('taken');
                seatBtn.innerText = row[1];
                seatBtn.style.fontSize = '10px';
            }
        });
    });
}

function confirmBooking() {
    const name = document.getElementById('student-name').value;
    if (selectedSeat && name) {
        const seatNumber = selectedSeat.id.replace('seat-', '');
        fetch(scriptURL, { method: 'POST', body: JSON.stringify({ seat: seatNumber, name: name }) })
        .then(() => { alert('จองสำเร็จ!'); location.reload(); });
    } else { alert('กรุณาเลือกที่นั่งและใส่ชื่อครับ'); }
}

createSeats();
loadSeats();
