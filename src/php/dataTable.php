<?
function renderDataTable($values) {
  $header = array("Дата замера", "Длина отрезка, мм", "Удлинение, %", "Добыча, тыс. т", "Ответственный");

  echo '<table id="data-table">';
  echo '<col class="title-column">';
  $pointsCount = count($values);
  for ($i = 0; $i < $pointsCount; $i++) {
    echo '<col class="point-column">';
  }

  echo '<thead>';
  echo '<tr><th></th>';
  for ($i = 0; $i < 4; $i++) {
    $h = $i < $pointsCount ? 'Замер ' . strval($i + 1) : '';
    echo '<th>' . $h . '</th>';
  }
  echo '</tr></thead>';

  $rows = count($header);
  for ($row = 0; $row < $rows; $row++) {
    echo '<tr>';
    echo '<td>' . $header[$row] . '</td>';
    for ($i = 0; $i < 4; $i++) {
      if ($i < $pointsCount) {
        echo '<td>' . $values[$i][$row] . '</td>';
      }
    }
    echo '</tr>';
  }
  echo '</table>';
}
?>
