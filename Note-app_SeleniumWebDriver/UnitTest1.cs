using Microsoft.VisualStudio.TestTools.UnitTesting;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections;
using System.Threading;
using Assert = NUnit.Framework.Assert;

namespace NoteApp_SeleniumWebDriver
{
    public class Tests
    {
        IWebDriver driver;
        string weburl = confidential.LocalHost;

        [SetUp]
        public void Setup()
        {
            // ARRANGE
            driver = new ChromeDriver(confidential.DriverLocation);

            // ACT
            driver.Url = weburl;
        }

        // TITLE is empty
        [Test]
        public void title_is_empty()
        {
            // ARRANGE
            IWebElement titleField = driver.FindElement(By.Id("titleField"));
            IWebElement noteField = driver.FindElement(By.Id("noteField"));
            IWebElement saveButton = driver.FindElement(By.Id("saveButton"));
            string expectedAlert = "Title can't be empty";

            // ACT
            titleField.SendKeys("");
            noteField.SendKeys("Test note body");
            saveButton.Click();
            Thread.Sleep(1000);
            string alertMessage = driver.SwitchTo().Alert().Text;
            driver.SwitchTo().Alert().Accept();

            // ASSERT
            Assert.AreEqual(alertMessage, expectedAlert);
        }

        // BODY is empty
        [Test]
        public void note_body_is_empty()
        {
            // ARRANGE
            IWebElement titleField = driver.FindElement(By.Id("titleField"));
            IWebElement noteField = driver.FindElement(By.Id("noteField"));
            IWebElement saveButton = driver.FindElement(By.Id("saveButton"));
            string expectedAlert = "Note can't be empty";

            // ACT
            titleField.SendKeys("Test note title");
            noteField.SendKeys("");
            saveButton.Click();
            Thread.Sleep(1000);
            string alertMessage = driver.SwitchTo().Alert().Text;
            driver.SwitchTo().Alert().Accept();

            // ASSERT
            Assert.AreEqual(alertMessage, expectedAlert);
        }

        // Clear the content of the title field
        [Test]
        public void clear_title_field()
        {
            // ARRANGE
            IWebElement titleField = driver.FindElement(By.Id("titleField"));
            IWebElement noteField = driver.FindElement(By.Id("noteField"));
            IWebElement eraseButton = driver.FindElement(By.Id("eraseButton"));

            // ACT
            titleField.SendKeys("Test note title");
            noteField.SendKeys("Test note body");
            eraseButton.Click();
            Thread.Sleep(500);
            string titleAfter = titleField.Text;

            // ASSERT
            Assert.AreEqual("", titleAfter);
        }

        // Clear the content of the body field
        [Test]
        public void clear_body_field()
        {
            // ARRANGE
            IWebElement titleField = driver.FindElement(By.Id("titleField"));
            IWebElement noteField = driver.FindElement(By.Id("noteField"));
            IWebElement eraseButton = driver.FindElement(By.Id("eraseButton"));

            // ACT
            titleField.SendKeys("Test note title");
            noteField.SendKeys("Test note body");
            eraseButton.Click();
            Thread.Sleep(500);
            string titleAfter = noteField.Text;

            // ASSERT
            Assert.AreEqual("", titleAfter);
        }

        // TITLE is longer than 40 characters
        [Test]
        public void title_is_longer_than_40()
        {
            // ARRANGE
            IWebElement titleField = driver.FindElement(By.Id("titleField"));
            IWebElement noteField = driver.FindElement(By.Id("noteField"));
            IWebElement saveButton = driver.FindElement(By.Id("saveButton"));
            string expectedAlert = "Title can max contain 40 characters";

            // ACT
            titleField.SendKeys("12345678901234567890123456789012345A-!@äx");
            noteField.SendKeys("Test note body");
            saveButton.Click();
            Thread.Sleep(1000);
            string alertMessage = driver.SwitchTo().Alert().Text;
            driver.SwitchTo().Alert().Accept();

            // ASSERT
            Assert.AreEqual(alertMessage, expectedAlert);
        }

        // BODY is longer than 500 characters
        [Test]
        public void body_is_longer_than_500()
        {
            // ARRANGE
            IWebElement titleField = driver.FindElement(By.Id("titleField"));
            IWebElement noteField = driver.FindElement(By.Id("noteField"));
            IWebElement saveButton = driver.FindElement(By.Id("saveButton"));
            string expectedAlert = "note text can max contain 500 characters";
            string noteBody = "";
            for (int i = 0; i < 51; i++)
            {
                noteBody += "12345A-!@ä";
            }

            // ACT
            titleField.SendKeys("Test note title");
            noteField.SendKeys(noteBody);
            saveButton.Click();
            Thread.Sleep(1000);
            string alertMessage = driver.SwitchTo().Alert().Text;
            driver.SwitchTo().Alert().Accept();

            // ASSERT
            Assert.AreEqual(alertMessage, expectedAlert);
        }

        // Trying to save another note, when we have 10/10 notes saved already
        [Test]
        public void trying_to_save_more_than_10_notes()
        {
            // ARRANGE
            IWebElement titleField = driver.FindElement(By.Id("titleField"));
            IWebElement noteField = driver.FindElement(By.Id("noteField"));
            IWebElement saveButton = driver.FindElement(By.Id("saveButton"));
            string expectedAlert = "You can only have 10 notes";

            // ACT
            titleField.SendKeys("Test note title");
            noteField.SendKeys("Test note body");
            for (int i = 0; i < 11; i++)
            {
                saveButton.Click();
            }
            Thread.Sleep(1000);
            string alertMessage = driver.SwitchTo().Alert().Text;
            driver.SwitchTo().Alert().Accept();

            // ASSERT
            Assert.AreEqual(alertMessage, expectedAlert);
        }

        // Trying to open a note, without selecting one from the list
        [Test]
        public void trying_to_open_unselected_note()
        {
            // ARRANGE
            close_Browser();
            Setup();
            Thread.Sleep(2000);
            IWebElement openButton = driver.FindElement(By.Id("openButton"));
            string expectedAlert = "You need to select a note";

            // ACT
            openButton.Click();
            Thread.Sleep(1000);
            string alertMessage = driver.SwitchTo().Alert().Text;
            driver.SwitchTo().Alert().Accept();

            // ASSERT
            Assert.AreEqual(alertMessage, expectedAlert);
        }

        // Trying to delete a note, without selecting one from the list
        [Test]
        public void trying_to_delete_unselected_note()
        {
            // ARRANGE
            close_Browser();
            Setup();
            Thread.Sleep(2000);
            IWebElement deleteButton = driver.FindElement(By.Id("deleteButton"));
            string expectedAlert = "You need to select a note";

            // ACT
            deleteButton.Click();
            Thread.Sleep(1000);
            string alertMessage = driver.SwitchTo().Alert().Text;
            driver.SwitchTo().Alert().Accept();

            // ASSERT
            Assert.AreEqual(alertMessage, expectedAlert);
        }

        // SAVE then OPEN notes with different sets of characters (using dataprovider to create multiple test cases)
        [TestCase("Title One", "Body One")] // Latin
        [TestCase("12345", "1234567890")] // numbers
        [TestCase(@"~!@#$%^&*()-_=+[]\{}|;':,./<>?", @"~!@#$%^{}|;':,./<>?")] // special characters
        [TestCase("ソフトウェアテスト", "ソフトウェアテスト ソフトウェアテスト")] // katakana
        [TestCase("そふとうぇあてすと", "そふとうぇあてすと そふとうぇあてすと")] // hiragana
        [TestCase("軟件測試", "軟件測試 軟件測試")] // kanji
        [TestCase("тестирование программного обеспечения", "тестирование программного обеспечения тестирование")] // Cyrillic
        [TestCase("소프트웨어 테스팅", "소프트웨어 테스팅 소프트웨어 테스팅")] // hangul
        [TestCase("اختبار البرمجيات", "ااختبار البرمجيات ختبار البرمجيات")] // Arabic
        [TestCase("सॉफ्टवेयर परीक्षण", "सॉफ्टवेयर परीक्षण सॉफ्टवेयर परीक्षण")] // Devanagari
        [TestCase("בדיקת תוכנה", "בדיקת תוכנה בדיקת תוכנה")] // Hebrew
        [TestCase("సాఫ్ట్‌వేర్ పరీక్ష", "సాఫ్ట్‌వేర్ పరీక్ష సాఫ్ట్‌వేర్ పరీక్ష")] // Telugu
        [TestCase("ÅåÄäÖöÆæØø", "ÅåÄäÖöÆæØø ÅåÄäÖöÆæØø")] // Nordic special characters
        public void save_then_open_notes_with_different_charsets(string originalTitle, string originalBody)
        {
            // ARRANGE
            IWebElement titleField = driver.FindElement(By.Id("titleField"));
            IWebElement noteField = driver.FindElement(By.Id("noteField"));
            IWebElement saveButton = driver.FindElement(By.Id("saveButton"));
            IWebElement openButton = driver.FindElement(By.Id("openButton"));
            SelectElement noteList = new SelectElement(driver.FindElement(By.Id("savedNotes")));

            // ACT
            titleField.SendKeys(originalTitle);
            noteField.SendKeys(originalBody);
            saveButton.Click();
            Thread.Sleep(500);

            noteList.SelectByText(originalTitle);
            openButton.Click();
            Thread.Sleep(500);
            string reopenedTitle = titleField.GetAttribute("value");
            string reopenedBody = noteField.GetAttribute("value");

            // ASSERT
            Assert.AreEqual(reopenedTitle, originalTitle);
            Assert.AreEqual(reopenedBody, originalBody);
        }

        // SAVE note then DELETE it
        [Test]
        //[ExpectedException(typeof(ElementNotSelectableException))]  ---> This got removed from NUnit recently
        public void save_then_delete_note()
        {
            // ARRANGE
            IWebElement titleField = driver.FindElement(By.Id("titleField"));
            IWebElement noteField = driver.FindElement(By.Id("noteField"));
            IWebElement saveButton = driver.FindElement(By.Id("saveButton"));
            IWebElement deleteButton = driver.FindElement(By.Id("deleteButton"));
            SelectElement noteList = new SelectElement(driver.FindElement(By.Id("savedNotes")));

            // ACT
            titleField.SendKeys("Test note title");
            noteField.SendKeys("Test note body");
            saveButton.Click();
            Thread.Sleep(500);

            noteList.SelectByText("Test note title");
            deleteButton.Click();
            Thread.Sleep(500);

            // ASSERT (Assert.Throws<>() is the new way to check expected exceptions)
            Assert.Throws<ElementNotSelectableException>(delegate ()
            {
                try
                {
                    noteList.SelectByText("Test note title");
                }
                catch
                {
                    throw new ElementNotSelectableException();
                }
            });            
        }
        
        // SAVE notes then check the counter
        [Test]
        public void save_then_check_counter()
        {
            // ARRANGE
            IWebElement titleField = driver.FindElement(By.Id("titleField"));
            IWebElement noteField = driver.FindElement(By.Id("noteField"));
            IWebElement saveButton = driver.FindElement(By.Id("saveButton"));
            IWebElement counterDisplay = driver.FindElement(By.Id("counter"));

            // ACT
            titleField.SendKeys("Test note title");
            noteField.SendKeys("Test note body");
            saveButton.Click();
            saveButton.Click();
            saveButton.Click();
            Thread.Sleep(500);
            string newCounterDisplay = counterDisplay.Text;

            // ASSERT
            Assert.AreEqual(newCounterDisplay, "3/10");
        }

        // SAVE notes then DELETE a note then check the counter
        [Test]
        public void save_then_delete_then_check_counter()
        {
            // ARRANGE
            IWebElement titleField = driver.FindElement(By.Id("titleField"));
            IWebElement noteField = driver.FindElement(By.Id("noteField"));
            IWebElement saveButton = driver.FindElement(By.Id("saveButton"));
            IWebElement deleteButton = driver.FindElement(By.Id("deleteButton"));
            SelectElement noteList = new SelectElement(driver.FindElement(By.Id("savedNotes")));

            // ACT
            titleField.SendKeys("Test note title");
            noteField.SendKeys("Test note body");
            saveButton.Click();
            saveButton.Click();
            saveButton.Click();
            Thread.Sleep(500);
            
            noteList.SelectByIndex(1);
            deleteButton.Click();
            Thread.Sleep(500);
            IWebElement counterDisplay = driver.FindElement(By.Id("counter"));
            string newCounterDisplay = counterDisplay.Text;

            // ASSERT
            Assert.AreEqual(newCounterDisplay, "2/10");
        }

        // Check for "Add New Note" button when opening a saved note
        [Test]
        public void open_then_check_newnote_button()
        {
            // ARRANGE
            IWebElement titleField = driver.FindElement(By.Id("titleField"));
            IWebElement noteField = driver.FindElement(By.Id("noteField"));
            IWebElement saveButton = driver.FindElement(By.Id("saveButton"));
            IWebElement openButton = driver.FindElement(By.Id("openButton"));
            SelectElement noteList = new SelectElement(driver.FindElement(By.Id("savedNotes")));

            // ACT
            titleField.SendKeys("Test note title");
            noteField.SendKeys("Test note body");
            saveButton.Click();
            Thread.Sleep(500);

            noteList.SelectByText("Test note title");
            openButton.Click();
            Thread.Sleep(500);

            // ASSERT
            Assert.AreEqual(driver.FindElements(By.Id("addNewNoteButton")).Count, 1);
        }

        // SORT notes by "Save Date", "Length" and "Title"
        [TestCase("dateSortButton")]
        [TestCase("lengthSortButton")]
        [TestCase("titleSortButton")]
        public void try_every_sorting_method(string currentSortButton)
        {
            // ARRANGE
            IWebElement titleField = driver.FindElement(By.Id("titleField"));
            IWebElement noteField = driver.FindElement(By.Id("noteField"));
            IWebElement saveButton = driver.FindElement(By.Id("saveButton"));
            IWebElement sortButton = driver.FindElement(By.Id(currentSortButton));
            SelectElement noteList = new SelectElement(driver.FindElement(By.Id("savedNotes")));

            // ACT
            titleField.Clear();
            titleField.SendKeys("CCC note");
            noteField.Clear();
            noteField.SendKeys("CCC");
            saveButton.Click();
            Thread.Sleep(100);

            titleField.Clear();
            titleField.SendKeys("AAA note");
            noteField.Clear();
            noteField.SendKeys("AAAAA");
            saveButton.Click();
            Thread.Sleep(100);

            titleField.Clear();
            titleField.SendKeys("BBB note");
            noteField.Clear();
            noteField.SendKeys("B");
            saveButton.Click();
            Thread.Sleep(100);            

            sortButton.Click();
            Thread.Sleep(500);

            // ASSERT
            switch (currentSortButton)
            {
                case "dateSortButton":
                    noteList.SelectByIndex(0);
                    Assert.AreEqual(noteList.SelectedOption.Text, "CCC note");
                    noteList.SelectByIndex(1);
                    Assert.AreEqual(noteList.SelectedOption.Text, "AAA note");
                    noteList.SelectByIndex(2);
                    Assert.AreEqual(noteList.SelectedOption.Text, "BBB note");
                    break;

                case "lengthSortButton":
                    noteList.SelectByIndex(0);
                    Assert.AreEqual(noteList.SelectedOption.Text, "AAA note");
                    noteList.SelectByIndex(1);
                    Assert.AreEqual(noteList.SelectedOption.Text, "CCC note");
                    noteList.SelectByIndex(2);
                    Assert.AreEqual(noteList.SelectedOption.Text, "BBB note");
                    break;

                case "titleSortButton":
                    noteList.SelectByIndex(0);
                    Assert.AreEqual(noteList.SelectedOption.Text, "AAA note");
                    noteList.SelectByIndex(1);
                    Assert.AreEqual(noteList.SelectedOption.Text, "BBB note");
                    noteList.SelectByIndex(2);
                    Assert.AreEqual(noteList.SelectedOption.Text, "CCC note");
                    break;
            }
        }

        [TearDown]
        public void close_Browser()
        {
            driver.Close();
        }
    }
}