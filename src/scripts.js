function generateTables() {
  const Z0 = parseInt(document.getElementById("Z0").value);
  const a = parseInt(document.getElementById("a").value);
  const m = parseInt(document.getElementById("m").value);
  const mu = parseFloat(document.getElementById("mu").value.replace(",", "."));
  const sigma = parseFloat(
    document.getElementById("sigma").value.replace(",", ".")
  );

  if (isNaN(Z0) || isNaN(a) || isNaN(m) || isNaN(mu) || isNaN(sigma)) {
    alert("Please enter valid numbers for all fields.");
    return;
  }

  let Z = Z0;
  let results = [];

  for (let i = 1; i <= 300; i++) {
    const aZ = a * Z;
    const Zi = aZ % m;
    const Ui = Zi / m;
    const Ui1 = ((a * Zi) % m) / m;
    const sqrtNeg2LnUi = Math.sqrt(-2 * Math.log(Ui));
    const cos2PiUi1 = Math.cos(2 * Math.PI * Ui1);
    const Zvalue = sqrtNeg2LnUi * cos2PiUi1;
    const X = mu + sigma * Zvalue;

    results.push({
      i,
      Z,
      a,
      m,
      mu,
      sigma,
      aZ,
      Zi,
      Zi1: (a * Zi) % m,
      Ui,
      Ui1,
      sqrtNeg2LnUi,
      cos2PiUi1,
      Zvalue,
      X,
    });

    Z = Zi;
  }

  updateTable("randomTable", results);
}

function updateTable(tableId, data) {
  const tableBody = document.querySelector(`#${tableId} tbody`);
  tableBody.innerHTML = "";

  data.forEach((row) => {
    const tr = document.createElement("tr");
    Object.values(row).forEach((value) => {
      const td = document.createElement("td");
      td.textContent = Number.isInteger(value) ? value : value.toFixed(6);
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });
}
