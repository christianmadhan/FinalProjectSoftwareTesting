using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections;

namespace NoteApp_SeleniumWebDriver
{
    public class Tests
    {
        IWebDriver driver;
        string weburl = confidential.Localhost;

        [SetUp]
        public void Setup()
        {
            // ARRANGE
            driver = new ChromeDriver(confidential.DriverLocation);

            // ACT
            driver.Url = weburl;
        }

        /// <summary>
        /// TEST METHODS
        /// </summary>

        [TearDown]
        public void close_Browser()
        {
            driver.Close();
        }
    }
}