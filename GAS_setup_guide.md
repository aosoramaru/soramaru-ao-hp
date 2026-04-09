# ファンの声 — Google Apps Script セットアップ手順

このガイドに従って設定すれば、ファンの声が **Googleスプレッドシート** に保存され、全員で共有できるようになります。

---

## ステップ1: Googleスプレッドシートを作成

1. [Google ドライブ](https://drive.google.com) を開く
2. 「新規」→「Google スプレッドシート」で新しいスプレッドシート作成
3. ファイル名を **「宙丸アオ Fan Voices」** などに変更
4. **1行目（ヘッダー）** に以下を入力：

| A1 | B1 | C1 |
|---|---|---|
| name | message | date |

5. シート名（左下のタブ）を **`FanVoices`** に変更

---

## ステップ2: Apps Script を設定

1. スプレッドシートのメニューから **「拡張機能」→「Apps Script」** を開く
2. 既存のコードを全て削除
3. 以下のコードを貼り付け：

```javascript
const SHEET_NAME = 'FanVoices';
const MAX_NAME_LENGTH = 30;
const MAX_MESSAGE_LENGTH = 300;

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();

    const voices = data.slice(1)
      .filter(row => row[0] && row[1])
      .map(row => ({
        name: String(row[0]),
        message: String(row[1]),
        date: formatDate(row[2])
      }))
      .reverse();

    return ContentService
      .createTextOutput(JSON.stringify({ voices: voices }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const name = String(data.name || '').trim().slice(0, MAX_NAME_LENGTH);
    const message = String(data.message || '').trim().slice(0, MAX_MESSAGE_LENGTH);

    if (!name || !message) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: '入力が不足しています' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    sheet.appendRow([name, message, new Date()]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function formatDate(d) {
  if (!(d instanceof Date)) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '.' + m + '.' + day;
}
```

4. 「💾 プロジェクトを保存」をクリック
5. プロジェクト名を「宙丸アオ Fan Voices API」などに設定

---

## ステップ3: Web アプリとしてデプロイ

1. 右上の **「デプロイ」→「新しいデプロイ」** をクリック
2. 「種類の選択」の⚙️アイコン → **「ウェブアプリ」** を選択
3. 設定：
   - 説明: `Fan Voices API v1`
   - 次のユーザーとして実行: **「自分」**
   - アクセスできるユーザー: **「全員」**
4. **「デプロイ」** をクリック
5. 初回は Google アカウント認証が求められるので承認
   - 「このアプリは Google で確認されていません」と表示されたら「詳細」→「（プロジェクト名）に移動」→「許可」
6. デプロイ完了後、**「ウェブアプリのURL」** が表示されるので **コピー**
   - URLは `https://script.google.com/macros/s/XXXXXXXXXXXX/exec` のような形

---

## ステップ4: そらまるに URL を渡す

コピーしたURLを私（Claude）に教えてください。
私が `fanvoice.html` に設定して、デプロイします。

---

## 運用上の注意

### 不適切な投稿を削除するには
- スプレッドシートを開いて、該当の行を右クリック →「行を削除」
- 削除はすぐに反映されます

### 承認制にする場合（オプション）
- D列に「approved」列を追加
- doGet の filter に `row[3] === true` を追加
- スプレッドシートで承認したい投稿のD列に `TRUE` を入力

### 投稿の数について
- GAS の無料枠は1日あたり20,000回のリクエストまで
- 通常の運用では全く問題ありません

### セキュリティ
- IPアドレス等は記録されません
- スパム対策として、1回の送信後は3秒間送信不可などのクライアント側制限を入れることも可能

---

## トラブルシューティング

### 「エラー: Authorization is required」と出る
→ デプロイ時に自分のGoogleアカウントで認証が完了していません。ステップ3の初回認証をやり直してください。

### URLにアクセスしたら `{"error":"..."}` と出る
→ シート名が `FanVoices` になっていない可能性があります。シート名を確認してください。

### 投稿してもスプレッドシートに反映されない
→ デプロイ時に「アクセスできるユーザー」が「全員」になっているか確認してください。

### コードを修正した後
→ 必ず「デプロイ」→「デプロイを管理」→ 既存のデプロイの編集（鉛筆アイコン）→ バージョンを「新バージョン」→ デプロイ
→ **URLは変わりません**（新しく作り直すとURLが変わるので注意）
